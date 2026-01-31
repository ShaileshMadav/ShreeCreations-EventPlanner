import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerAdmin); // use ONCE
router.post("/login", loginAdmin);

export default router;
