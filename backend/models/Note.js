import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: "" },
  clerkUserId: { type: String, required: true }, // store clerk user id
}, { timestamps: true });

export default mongoose.model("Note", noteSchema);
