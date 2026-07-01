import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, setTokenCookies, clearTokenCookies } from "../utils/jwt.utils.js";
import { generateSecureOTP, getOTPExpiryTime } from "../utils/otp.utils.js";
import { sendOTPEmail } from "../services/email.service.js";
import { AppError } from "../middleware/error.middleware.js";
import {
  addUserToSheet
} from "../services/userSheetService.js";

// ─── Signup ───────────────────────────────────────────────────────────────────
export const signup = async (req, res, next) => {
  try {
    const { fullName, username, email, password,userType } = req.body;

    // Check existing user
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      const field = existingUser.email === email ? "email" : "username";
      return res.status(409).json({
        success: false,
        message: `An account with this ${field} already exists.`,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_ROUNDS) || 12
    );

    // Create user
   const user = await prisma.user.create({
  data: {
    fullName,
    username,
    email,
    password: hashedPassword,
    userType,
  },
  select: {
    id: true,
    fullName: true,
    username: true,
    email: true,
    isVerified: true,
    role: true,
    userType: true,
    createdAt: true,
  },
});

console.log("STEP 1 - User Created");

// await addUserToSheet(user);

const otp = generateSecureOTP();
const expiresAt = getOTPExpiryTime();

console.log("STEP 2 - OTP Generated");

await prisma.otpVerification.deleteMany({
  where: { email },
});

await prisma.otpVerification.create({
  data: {
    email,
    otp,
    expiresAt,
  },
});

console.log("STEP 3 - OTP Saved");

await sendOTPEmail({
  to: email,
  otp,
  type: "verify",
});

console.log("STEP 4 - sendOTPEmail Finished");

res.status(201).json({
  success: true,
  message: "Account created successfully. Please check your email for the verification OTP.",
  data: { user },
});
// ─── Login ────────────────────────────────────────────────────────────────────
export const login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email address before logging in.",
        code: "EMAIL_NOT_VERIFIED",
        email: user.email,
      });
    }

    const tokenPayload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Store refresh token in DB
    const refreshExpiry = rememberMe
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)  // 30 days
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);  // 7 days

    await prisma.refreshToken.create({
      data: { token: refreshToken, userId: user.id, expiresAt: refreshExpiry },
    });

    setTokenCookies(res, accessToken, refreshToken);

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: "Login successful.",
      data: {
        user: userWithoutPassword,
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─── Logout ───────────────────────────────────────────────────────────────────
export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    }

    clearTokenCookies(res);

    res.json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    next(error);
  }
};

// ─── Refresh Token ────────────────────────────────────────────────────────────
export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided.",
      });
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(token);
    } catch {
      clearTokenCookies(res);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token.",
      });
    }

    const storedToken = await prisma.refreshToken.findUnique({ where: { token } });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      clearTokenCookies(res);
      return res.status(401).json({
        success: false,
        message: "Refresh token expired. Please log in again.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, isVerified: true },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found." });
    }

    const newAccessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role });
    const newRefreshToken = generateRefreshToken({ userId: user.id, email: user.email, role: user.role });

    await prisma.refreshToken.delete({ where: { token } });
    await prisma.refreshToken.create({
      data: { token: newRefreshToken, userId: user.id, expiresAt: storedToken.expiresAt },
    });

    setTokenCookies(res, newAccessToken, newRefreshToken);

    res.json({
      success: true,
      message: "Token refreshed.",
      data: { accessToken: newAccessToken },
    });
  } catch (error) {
    next(error);
  }
};

// ─── Verify Email OTP ─────────────────────────────────────────────────────────
export const verifyEmailOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await prisma.otpVerification.findFirst({
      where: { email },
      orderBy: { createdAt: "desc" },
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "No OTP found for this email. Please request a new one.",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await prisma.otpVerification.delete({ where: { id: otpRecord.id } });
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please check and try again.",
      });
    }

    await prisma.user.update({
      where: { email },
      data: { isVerified: true },
    });

    await prisma.otpVerification.delete({ where: { id: otpRecord.id } });

    res.json({
      success: true,
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    next(error);
  }
};

// ─── Forgot Password ──────────────────────────────────────────────────────────
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success to prevent user enumeration
    if (!user) {
      return res.json({
        success: true,
        message: "If an account with that email exists, a password reset OTP has been sent.",
      });
    }

    const otp = generateSecureOTP();
    const expiresAt = getOTPExpiryTime();

    await prisma.otpVerification.deleteMany({ where: { email } });
    await prisma.otpVerification.create({ data: { email, otp, expiresAt } });

    await sendOTPEmail({ to: email, otp, type: "reset" });

    res.json({
      success: true,
      message: "If an account with that email exists, a password reset OTP has been sent.",
    });
  } catch (error) {
    next(error);
  }
};

// ─── Reset Password ───────────────────────────────────────────────────────────
export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;

    const otpRecord = await prisma.otpVerification.findFirst({
      where: { email },
      orderBy: { createdAt: "desc" },
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new password reset.",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await prisma.otpVerification.delete({ where: { id: otpRecord.id } });
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_ROUNDS) || 12
    );

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // Invalidate all refresh tokens for this user
    const user = await prisma.user.findUnique({ where: { email } });
    await prisma.refreshToken.deleteMany({ where: { userId: user.id } });

    await prisma.otpVerification.delete({ where: { id: otpRecord.id } });

    clearTokenCookies(res);

    res.json({
      success: true,
      message: "Password reset successfully. Please log in with your new password.",
    });
  } catch (error) {
    next(error);
  }
};

// ─── Resend OTP ───────────────────────────────────────────────────────────────
export const resendOTP = async (req, res, next) => {
  try {
    const { email, type = "verify" } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    if (type === "verify" && user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified.",
      });
    }

    // Check rate limiting (max 1 OTP per minute)
    const recentOTP = await prisma.otpVerification.findFirst({
      where: { email },
      orderBy: { createdAt: "desc" },
    });

    if (recentOTP && new Date() - new Date(recentOTP.createdAt) < 60 * 1000) {
      return res.status(429).json({
        success: false,
        message: "Please wait at least 1 minute before requesting a new OTP.",
      });
    }

    const otp = generateSecureOTP();
    const expiresAt = getOTPExpiryTime();

    await prisma.otpVerification.deleteMany({ where: { email } });
    await prisma.otpVerification.create({ data: { email, otp, expiresAt } });

    await sendOTPEmail({ to: email, otp, type });

    res.json({
      success: true,
      message: "A new OTP has been sent to your email.",
    });
  } catch (error) {
    next(error);
  }
};

// ─── Get Current User ─────────────────────────────────────────────────────────
export const getMe = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: { user: req.user },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    const { fullName, username } = req.body;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        fullName,
        username,

        ...(req.file && {
          profileImage: req.file.path,
        }),
      },
    });

    return res.status(200).json({
      success: true,
      user: updatedUser,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

