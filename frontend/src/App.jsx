import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, useUser } from "@clerk/clerk-react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import NoteForm from "./pages/NoteForm";

function ProtectedRoute({ children }) {
  // require signed-in state; Clerk provides SignedIn wrap but sometimes route-level check useful
  return <SignedIn>{children}</SignedIn>;
}

export default function App(){
  return (
    <div>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          } />
          <Route path="/notes/new" element={<ProtectedRoute><NoteForm /></ProtectedRoute>} />
          <Route path="/notes/:id/edit" element={<ProtectedRoute><NoteForm /></ProtectedRoute>} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <SignedOut>
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">You must sign in to use notes — click Sign In in the nav.</p>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}
