import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import planRoutes from "./routes/plan.routes.js";
import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import eventTypeRoutes from "./routes/eventType.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/bookings", bookingRoutes);
app.use("/api/event-types", eventTypeRoutes);

// test route
app.get("/", (req, res) => {
  res.send("ShreeCreations Event Planner Backend Running 🚀");
});
app.use("/api/plans", planRoutes);
app.use("/api/auth", authRoutes);

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
