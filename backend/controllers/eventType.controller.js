import EventType from "../models/EventType.js";

// ADMIN: add new event type
export const createEventType = async (req, res) => {
  try {
    const { name } = req.body;

    const existing = await EventType.findOne({ name });

    // If exists but inactive → re-enable
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        await existing.save();
        return res.json(existing);
      }

      return res.status(400).json({ message: "Event type already exists" });
    }

    const eventType = await EventType.create({ name });
    res.status(201).json(eventType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUBLIC: get active event types
export const getEventTypes = async (req, res) => {
  const types = await EventType.find({ isActive: true }).sort({ name: 1 });
  res.json(types);
};

// ADMIN: update name or status
export const updateEventType = async (req, res) => {
  const updated = await EventType.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

export const deleteEventType = async (req, res) => {
  try {
    const eventType = await EventType.findById(req.params.id);

    if (!eventType) {
      return res.status(404).json({ message: "Event type not found" });
    }

    eventType.isActive = false;
    await eventType.save();

    res.json({ message: "Event type disabled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
