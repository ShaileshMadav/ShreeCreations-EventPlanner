import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    eventType: { type: String, required: true },
    planName: { type: String, required: true },
    planPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
