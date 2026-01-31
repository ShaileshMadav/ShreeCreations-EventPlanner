import express from "express";
import {
  createEventType,
  getEventTypes,
  updateEventType,
} from "../controllers/eventType.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { deleteEventType } from "../controllers/eventType.controller.js";

const router = express.Router();

// public
router.get("/", getEventTypes);

// admin
router.post("/", auth, createEventType);
router.put("/:id", auth, updateEventType);
router.delete("/:id", auth, deleteEventType);

export default router;
