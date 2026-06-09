import { Router } from "express";
import passport from "passport";

import {
  signup,
  login,
  logout,
  refreshToken,
  verifyEmailOTP,
  forgotPassword,
  resetPassword,
  resendOTP,
  getMe,
} from "../controllers/auth.controller.js";
import {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  verifyOTPSchema,
  resetPasswordSchema,
  resendOTPSchema,
  validate,
} from "../validations/auth.validation.js";
import { authenticate } from "../middleware/auth.middleware.js";

import {
  generateAccessToken,
  generateRefreshToken,
  setTokenCookies,
} from "../utils/jwt.utils.js";

const router = Router();

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  async (req, res) => {
    const tokenPayload = {
      userId: req.user.id,
      email: req.user.email,
      role: req.user.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    setTokenCookies(res, accessToken, refreshToken);

    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

// Public routes
router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);
router.post("/verify-otp", validate(verifyOTPSchema), verifyEmailOTP);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);
router.post("/resend-otp", validate(resendOTPSchema), resendOTP);

// Protected routes
router.get("/me", authenticate, getMe);

export default router;
