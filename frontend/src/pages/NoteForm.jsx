import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import { useUser } from "@clerk/clerk-react";

export default function NoteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`/notes/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content);
        })
        .catch(console.error);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Must be signed in");

    if (id) {
      await axios.put(`/notes/${id}`, { title, content });
    } else {
      await axios.post("/notes", { title, content, clerkUserId: user.id });
    }
    navigate("/notes");
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {id ? "Edit Note" : "Create New Note"}
        </h2>

        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Enter your note title..."
          />
        </div>

        {/* Content Input */}
        <div className="mt-5">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition"
            placeholder="Write your note content here..."
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center gap-4">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition font-medium"
          >
            {id ? "Update Note" : "Create Note"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/notes")}
            className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
