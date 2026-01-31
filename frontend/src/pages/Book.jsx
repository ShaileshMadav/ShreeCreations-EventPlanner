import { useLocation } from "react-router-dom";
import { useState } from "react";

const Book = () => {
  const { state: plan } = useLocation();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: plan?.eventType || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        planName: plan.name,
        planPrice: plan.price,
      }),
    });

    const data = await res.json();
    if (data.whatsappUrl) {
      window.location.href = data.whatsappUrl;
    }
  };

  if (!plan) return <p className="container">No plan selected</p>;

  return (
    <div className="container">
      <h2>Book {plan.name}</h2>
      <p>
        <strong>Price:</strong> ₹{plan.price}
      </p>

      <form className="booking-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your Name"
          required
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email (optional)"
          onChange={handleChange}
        />
        <label>Selected Event</label>
        <input name="eventType" value={form.eventType} disabled />

        <button type="submit">Continue to WhatsApp</button>
      </form>
    </div>
  );
};

export default Book;
