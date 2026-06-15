import express from "express";
import upload from "../middleware/upload.js";
import {
  authenticate,
  requireRole,
} from "../middleware/auth.middleware.js";
import {
  applyInternship,
  getApplications,
  deleteApplication,
  updateStatus,
  getMyApplications,
    cancelApplication,
    getApplicationCounts,
} from "../controllers/internshipController.js";

const router = express.Router();

router.post(
  "/apply",
  authenticate,
  upload.single("resume"),
  applyInternship
);

router.get(
  "/counts",
  authenticate,
  requireRole("ADMIN"),
  getApplicationCounts
);

router.get(
  "/my-applications",
  authenticate,
  getMyApplications
);

router.patch(
  "/:id/status",
  authenticate,
  requireRole("ADMIN"),
  updateStatus
);
router.get("/", getApplications);

router.delete("/:id", deleteApplication);

router.delete(
  "/cancel/:id",
  authenticate,
  cancelApplication
);
export default router;