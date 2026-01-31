import { useEffect, useState } from "react";

const BookingsAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("All");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setBookings);
  }, []);

  // unique event types from bookings
  const eventTypes = ["All", ...new Set(bookings.map((b) => b.eventType))];

  // filter logic
  const filteredBookings = bookings.filter((b) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      b.name.toLowerCase().includes(searchText) ||
      b.phone.includes(searchText) ||
      b.planName.toLowerCase().includes(searchText);

    const matchesEvent = eventFilter === "All" || b.eventType === eventFilter;

    return matchesSearch && matchesEvent;
  });

  return (
    <>
      <h3>Bookings</h3>

      {/* SEARCH & FILTER */}
      <div className="booking-filters">
        <input
          placeholder="Search by name, phone or plan"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
        >
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {filteredBookings.length === 0 && <p>No matching bookings found.</p>}

      {filteredBookings.map((b) => (
        <div key={b._id} className="admin-card">
          <strong>{b.name}</strong> — {b.phone}
          <div>Email: {b.email || "—"}</div>
          <div>Event: {b.eventType}</div>
          <div>Plan: {b.planName}</div>
          <div>Price: ₹{b.planPrice}</div>
          <div>Date: {new Date(b.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </>
  );
};

export default BookingsAdmin;
