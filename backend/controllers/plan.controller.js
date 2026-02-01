import EventPlan from "../models/EventPlan.js";
import supabase from "../config/supabase.js";

export const createPlan = async (req, res) => {
  try {
    const { name, price, offer, eventType } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Media file required" });
    }

    if (!eventType) {
      return res.status(400).json({ message: "Event type is required" });
    }

    const file = req.file;
    const mediaType = file.mimetype.startsWith("video") ? "video" : "image";

    // generate unique filename
    const fileExt = file.originalname.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    // upload to Supabase Storage
    const { error } = await supabase.storage
      .from("shreecreations")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return res.status(500).json({ message: "File upload failed" });
    }

    // get public URL
    const { data } = supabase.storage
      .from("shreecreations")
      .getPublicUrl(fileName);

    const plan = await EventPlan.create({
      name,
      price,
      offer,
      eventType,
      mediaUrl: data.publicUrl, // ✅ persistent URL
      mediaType,
      isActive: true,
    });

    res.status(201).json({
      message: "Plan created successfully",
      data: plan,
    });
  } catch (err) {
    console.error("Create plan error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getPlans = async (req, res) => {
  try {
    const filter = { isActive: true };

    if (req.query.eventType) {
      filter.eventType = req.query.eventType;
    }

    const plans = await EventPlan.find(filter).sort({ createdAt: -1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
