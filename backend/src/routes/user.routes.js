import { Router } from "express";
import prisma from "../config/prisma.js";

import {
  authenticate,
  requireVerified,
  requireRole,
} from "../middleware/auth.middleware.js";

import {
  getAllUsers,
} from "../controllers/user.controller.js";

const router = Router();


// ===============================
// ADMIN - Get All Users
// ===============================

router.get(
  "/all",
  authenticate,
  requireRole("ADMIN"),
  getAllUsers
);


// ===============================
// USER DASHBOARD DATA
// ===============================

router.get(
  "/dashboard",
  authenticate,
  requireVerified,
  async (req, res, next) => {

    try {

      const user = await prisma.user.findUnique({

        where: {
          id: req.user.id,
        },

        select: {

          id: true,
          fullName: true,
          username: true,
          email: true,
          role: true,
          userType: true,
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

            lastLogin:
              new Date().toISOString(),

            accountAge:
              Math.floor(

                (new Date() -
                  new Date(user.createdAt))

                /

                (1000 * 60 * 60 * 24)

              ),

          },

        },

      });

    } catch (error) {

      next(error);

    }

  }
);


// ===============================
// UPDATE PROFILE
// ===============================

router.patch(
  "/profile",
  authenticate,
  requireVerified,

  async (req, res, next) => {

    try {

      const {
        fullName,
      } = req.body;

      const updated =
        await prisma.user.update({

          where: {
            id: req.user.id,
          },

          data: {

            fullName:
              fullName?.trim(),

          },

          select: {

            id: true,
            fullName: true,
            username: true,
            email: true,
            role: true,
            userType: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true,

          },

        });

      res.json({

        success: true,

        message:
          "Profile updated successfully.",

        data: {
          user: updated,
        },

      });

    } catch (error) {

      next(error);

    }

  }
);


// ===============================
// DELETE USER (ADMIN ONLY)
// ===============================

router.delete(
  "/:id",

  authenticate,

  requireRole("ADMIN"),

  async (req, res) => {

    try {

      await prisma.user.delete({

        where: {
          id: req.params.id,
        },

      });

      res.json({

        success: true,

        message:
          "User deleted successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to delete user",

      });

    }

  }
);

export default router;