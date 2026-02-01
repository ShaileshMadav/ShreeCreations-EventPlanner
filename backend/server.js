import dotenv from "dotenv";
dotenv.config(); // MUST BE FIRST

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import planRoutes from "./routes/plan.routes.js";
import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import eventTypeRoutes from "./routes/eventType.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors({ origin: [process.env.FRONTEND_URL, "http://localhost:5173"] }));
app.use(express.json());

// routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/event-types", eventTypeRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("ShreeCreations Event Planner Backend Running 🚀");
});

// connect DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("DB connection error ❌", err));
