import express from "express";
import {
  createBooking,
  getBookings,
} from "../controllers/booking.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", createBooking); // public
router.get("/", auth, getBookings); // admin only

export default router;
