const API_URL = import.meta.env.VITE_API_URL;

export const getEventPlans = async () => {
  const res = await fetch(`${API_URL}/plans`);
  if (!res.ok) throw new Error("Failed to fetch plans");
  return res.json();
};

export const getEventTypes = async () => {
  const res = await fetch(`${API_URL}/event-types`);
  if (!res.ok) throw new Error("Failed to fetch event types");
  return res.json();
};
