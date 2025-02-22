import express from "express";
import History from "../models/historyModel.js";

const router = express.Router();

// Save an image to history
router.post("/save", async (req, res) => {
  const { userId, image } = req.body;

  if (!userId || !image) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newHistory = new History({ userId, image });
    await newHistory.save();
    res.status(201).json({ message: "Image saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving image" });
  }
});

// Get user history
router.get("/:userId", async (req, res) => {
  try {
    const history = await History.find({ userId: req.params.userId });
    res.status(200).json({ history: history.map((h) => h.image) });
  } catch (error) {
    res.status(500).json({ message: "Error fetching history" });
  }
});

export default router;
