import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    const message = `
New Booking 🎉
Name: ${booking.name}
Phone: ${booking.phone}
Event: ${booking.eventType}
Plan: ${booking.planName}
Price: ₹${booking.planPrice}
    `;

    const whatsappUrl = `https://wa.me/${process.env.ADMIN_PHONE}?text=${encodeURIComponent(
      message,
    )}`;

    res.status(201).json({
      success: true,
      whatsappUrl,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookings = async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
};
