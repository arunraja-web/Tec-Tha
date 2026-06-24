import express from "express";
import {
  authenticate,
  requireRole,
} from "../middleware/auth.middleware.js";

import {
  sendCustomEmail,
} from "../controllers/adminController.js";

const router = express.Router();

router.post(
  "/send-email",
  authenticate,
  requireRole("ADMIN"),
  sendCustomEmail
);

export default router;