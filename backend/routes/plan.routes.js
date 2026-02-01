import express from "express";
import {
  createPlan,
  getPlans,
  updatePlan,
} from "../controllers/plan.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ADMIN → create new plan (image/video upload)
router.post(
  "/",
  auth,
  upload.single("media"), // ⚠️ field name must be "media"
  createPlan,
);

// PUBLIC → get all active plans
router.get("/", getPlans);

// ADMIN → update / disable plan
router.put("/:id", auth, updatePlan);

export default router;
