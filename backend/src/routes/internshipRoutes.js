import express from "express";
import upload from "../middleware/upload.js";

import {
  applyInternship,
  getApplications,
  deleteApplication,
} from "../controllers/internshipController.js";

const router = express.Router();

router.post(
  "/apply",
  upload.single("resume"),
  applyInternship
);

router.get("/", getApplications);

router.delete("/:id", deleteApplication);

export default router;