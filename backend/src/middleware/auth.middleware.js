import { verifyAccessToken } from "../utils/jwt.utils.js";
import prisma from "../config/prisma.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken ||
      (req.headers.authorization?.startsWith("Bearer ") &&
        req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired. Please refresh your session.",
          code: "TOKEN_EXPIRED",
        });
      }
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireVerified = (req, res, next) => {
  if (!req.user?.isVerified) {
    return res.status(403).json({
      success: false,
      message: "Please verify your email address first.",
      code: "EMAIL_NOT_VERIFIED",
    });
  }
  next();
};

export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Insufficient permissions.",
    });
  }
  next();
};
