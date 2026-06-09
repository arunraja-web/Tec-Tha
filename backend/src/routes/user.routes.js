import { Router } from "express";
import { authenticate, requireVerified } from "../middleware/auth.middleware.js";
import prisma from "../config/prisma.js";

const router = Router();

// Get dashboard data
router.get("/dashboard", authenticate, requireVerified, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({
      success: true,
      data: {
        user,
        stats: {
          lastLogin: new Date().toISOString(),
          accountAge: Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// Update profile
router.patch("/profile", authenticate, requireVerified, async (req, res, next) => {
  try {
    const { fullName } = req.body;

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: { fullName: fullName?.trim() },
      select: {
        id: true, fullName: true, username: true, email: true,
        role: true, isVerified: true, createdAt: true, updatedAt: true,
      },
    });

    res.json({ success: true, message: "Profile updated.", data: { user: updated } });
  } catch (error) {
    next(error);
  }
});

export default router;
