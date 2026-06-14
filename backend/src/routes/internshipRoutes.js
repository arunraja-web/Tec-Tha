import express from "express";
import upload from "../middleware/upload.js";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  applyInternship,
  getApplications,
  deleteApplication,
} from "../controllers/internshipController.js";

const router = express.Router();

router.post(
  "/apply",
  authenticate,
  upload.single("resume"),
  applyInternship
);
router.get("/", getApplications);

router.delete("/:id", deleteApplication);

export default router;