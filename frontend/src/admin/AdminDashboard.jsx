import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventTypesAdmin from "./EventTypesAdmin";
import EventPlansAdmin from "./EventPlansAdmin";
import BookingsAdmin from "./BookingsAdmin";
import "../styles/admin.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("eventsTypes");

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* TOGGLE TABS */}
      <div className="admin-tabs">
        <button
          className={activeTab === "eventsTypes" ? "active" : ""}
          onClick={() => setActiveTab("eventsTypes")}
        >
          Add Event Types
        </button>

        <button
          className={activeTab === "events" ? "active" : ""}
          onClick={() => setActiveTab("events")}
        >
          Event Management
        </button>

        <button
          className={activeTab === "bookings" ? "active" : ""}
          onClick={() => setActiveTab("bookings")}
        >
          Bookings
        </button>
      </div>

      {/* CONTENT */}
      <div className="admin-content">
        {activeTab === "eventsTypes" && (
          <>
            <EventTypesAdmin />
          </>
        )}

        {activeTab === "events" && (
          <>
            <EventPlansAdmin />
          </>
        )}

        {activeTab === "bookings" && <BookingsAdmin />}
      </div>
    </div>
  );
};

export default AdminDashboard;
