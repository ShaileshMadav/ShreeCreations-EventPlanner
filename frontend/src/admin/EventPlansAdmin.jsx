import { useEffect, useState } from "react";

const EventPlansAdmin = () => {
  const [plans, setPlans] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    offer: "",
    eventType: "",
  });
  const [media, setMedia] = useState(null);

  const token = localStorage.getItem("adminToken");

  const fetchData = async () => {
    const plansRes = await fetch(`${import.meta.env.VITE_API_URL}/plans`);
    const plansData = await plansRes.json();
    setPlans(plansData.data || plansData);

    const typesRes = await fetch(`${import.meta.env.VITE_API_URL}/event-types`);
    const typesData = await typesRes.json();
    setEventTypes(typesData.data || typesData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("offer", form.offer);
    fd.append("eventType", form.eventType);
    fd.append("media", media);

    await fetch(`${import.meta.env.VITE_API_URL}/plans`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fd,
    });
    setForm({ name: "", price: "", offer: "", eventType: "" });
    setMedia(null);
    fetchData();
  };

  const disablePlan = async (id) => {
    if (!window.confirm("Disable this plan?")) return;

    await fetch(`${import.meta.env.VITE_API_URL}/plans/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isActive: false }),
    });

    fetchData();
  };

  return (
    <>
      <h3>Event Plans</h3>

      {/* ADD PLAN FORM */}
      <form
        className="admin-form"
        onSubmit={handleSubmit}
        style={{ marginBottom: 20 }}
      >
        <input
          placeholder="Plan Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          placeholder="Offer (optional)"
          value={form.offer}
          onChange={(e) => setForm({ ...form, offer: e.target.value })}
        />

        <select
          value={form.eventType}
          //   className="full"
          onChange={(e) => setForm({ ...form, eventType: e.target.value })}
          required
        >
          <option value="">Select Event Type</option>
          {eventTypes.map((t) => (
            <option key={t._id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setMedia(e.target.files[0])}
          required
        />

        <button type="submit" className="primary full">
          Add Plan
        </button>
      </form>

      {/* PLAN LIST */}
      {plans
        .filter((p) => p.isActive !== false)
        .map((p) => (
          <div key={p._id} className="admin-card plan-card-admin">
            <div className="plan-info">
              <strong>{p.name}</strong> — ₹{p.price}
              <div>Event: {p.eventType}</div>
              {p.offer && <div>Offer: {p.offer}</div>}
            </div>

            <button
              type="button"
              className="danger"
              onClick={() => disablePlan(p._id)}
            >
              Delete
            </button>
          </div>
        ))}
    </>
  );
};

export default EventPlansAdmin;
