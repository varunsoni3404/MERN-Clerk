import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Notes() {
  const { user } = useUser();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    if (!user) return;
    try {
      const res = await axios.get("/notes", { params: { clerkUserId: user.id } });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [user]);

  const deleteNote = async (id) => {
    if (!window.confirm("Delete note?")) return;
    await axios.delete(`/notes/${id}`);
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-16 bg-slate-200 animate-pulse rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">📝 Your Notes</h2>
        <Link
          to="/notes/new"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-lg shadow-sm"
        >
          + New Note
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="text-slate-600 text-center py-10">
          No notes yet. Create your first note!
        </div>
      ) : (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <li
              key={note._id}
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg text-slate-800">
                  {note.title}
                </h3>
                <p className="text-sm text-slate-600 mt-1">{note.content}</p>
              </div>
              <div className="flex gap-3 mt-4">
                <Link
                  to={`/notes/${note._id}/edit`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
