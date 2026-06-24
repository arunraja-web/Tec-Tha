import express from "express";
import upload from "../middleware/upload.js";

import {
  authenticate,
  requireRole,
} from "../middleware/auth.middleware.js";

import {
  applyCareer,
  getMyCareerApplications,
  getAllCareerApplications,
   updateCareerStatus,
} from "../controllers/careerController.js";

const router = express.Router();

router.post(

  "/apply",

  authenticate,

  upload.single("resume"),

  applyCareer

);
router.get(
  "/my-applications",
  authenticate,
  getMyCareerApplications
);
router.get(
  "/my-applications",
  authenticate,
  getMyCareerApplications
);

router.get(
  "/all",
  authenticate,
  requireRole("ADMIN"),
  getAllCareerApplications
);

router.patch(
  "/:id/status",
  authenticate,
  requireRole("ADMIN"),
  updateCareerStatus
);
export default router;