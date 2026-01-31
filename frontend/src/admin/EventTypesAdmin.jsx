import { useEffect, useState } from "react";

const EventTypesAdmin = () => {
  const [types, setTypes] = useState([]);
  const [name, setName] = useState("");

  const token = localStorage.getItem("adminToken");

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event type?")) return;

    await fetch(`${import.meta.env.VITE_API_URL}/event-types/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTypes();
  };

  const fetchTypes = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/event-types`);
    setTypes(await res.json());
  };

  const addType = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/event-types`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchTypes();
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <>
      <h3>Event Types</h3>
      <div className="event-type-add">
        <input
          placeholder="New Event Type"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="primary" onClick={addType}>
          Add
        </button>
      </div>

      <ul className="event-type-list">
        {types.map((t) => (
          <li key={t._id} className="event-type-item">
            <span>{t.name}</span>

            <button
              type="button"
              className="delete-x"
              onClick={() => handleDelete(t._id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EventTypesAdmin;
