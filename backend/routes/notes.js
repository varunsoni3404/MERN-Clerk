import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// Create note
router.post("/", async (req, res) => {
  try {
    // expectation: client sends clerkUserId in body (or header)
    const { title, content, clerkUserId } = req.body;
    if (!clerkUserId) return res.status(400).json({ message: "Missing clerkUserId" });
    const note = await Note.create({ title, content, clerkUserId });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List notes for a user
router.get("/", async (req, res) => {
  try {
    const clerkUserId = req.query.clerkUserId || req.headers["x-clerk-user-id"];
    if (!clerkUserId) return res.status(400).json({ message: "Missing clerkUserId" });
    const notes = await Note.find({ clerkUserId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single note
router.get("/:id", async (req,res) => {
  try {
    const note = await Note.findById(req.params.id);
    if(!note) return res.status(404).json({ message: "Not found" });
    res.json(note);
  } catch(err){ res.status(500).json({ error: err.message }); }
});

// Update
router.put("/:id", async (req,res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if(!note) return res.status(404).json({ message: "Not found" });
    res.json(note);
  } catch(err){ res.status(500).json({ error: err.message }); }
});

// Delete
router.delete("/:id", async (req,res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if(!note) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch(err){ res.status(500).json({ error: err.message }); }
});

export default router;
