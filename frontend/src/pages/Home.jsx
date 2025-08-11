import React from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6 text-center bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-2xl">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 leading-tight animate-fadeIn">
          Welcome to <span className="text-blue-600">MERN + Clerk</span> Boilerplate
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 animate-fadeIn delay-100">
          Build your next project faster with ready-made authentication and CRUD functionality.
        </p>

        {/* Call to action */}
        <SignedOut>
          <div className="mt-8 animate-fadeIn delay-200">
            <SignInButton mode="modal">
              <button className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                Get Started
              </button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <p className="mt-6 text-green-600 font-medium animate-fadeIn delay-200">
            You’re signed in — go to your notes!
          </p>
        </SignedIn>
      </div>
    </div>
  );
}
