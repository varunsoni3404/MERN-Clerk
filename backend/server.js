import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import notesRouter from "./routes/notes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => res.send("MERN Clerk backend running"));

// Notes routes
app.use("/api/notes", notesRouter);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { })
  .then(()=> app.listen(PORT, ()=> console.log(`Server running on ${PORT}`)))
  .catch((err)=> {
    console.error("DB connection error:", err);
  });
