import EventPlan from "../models/EventPlan.js";

export const createPlan = async (req, res) => {
  try {
    const { name, price, offer, eventType } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Media file required" });
    }

    if (!eventType) {
      return res.status(400).json({ message: "Event type is required" });
    }

    const mediaType = req.file.mimetype.startsWith("video") ? "video" : "image";

    const plan = await EventPlan.create({
      name,
      price,
      offer,
      eventType,
      mediaUrl: `/uploads/${req.file.filename}`,
      mediaType,
    });

    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPlans = async (req, res) => {
  const filter = { isActive: true };
  if (req.query.eventType) {
    filter.eventType = req.query.eventType;
  }
  const plans = await EventPlan.find({ isActive: true }).sort({
    createdAt: -1,
  });
  res.json(plans);
};

export const updatePlan = async (req, res) => {
  try {
    const updatedPlan = await EventPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json(updatedPlan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
