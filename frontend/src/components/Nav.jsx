import React from "react";
import { NavLink } from "react-router-dom";
import { UserButton, useUser, SignInButton, SignOutButton } from "@clerk/clerk-react";

export default function Nav() {
    const { isSignedIn } = useUser();

    const navLinkClass = ({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
            ? "bg-blue-100 text-blue-700"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        }`;

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 px-5 py-2">
            <div className="container flex items-center justify-between py-3">
                {/* Left Section */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <NavLink to="/" className="font-bold text-lg text-blue-600 tracking-tight">
                        MERN-Clerk
                    </NavLink>
                    <NavLink to="/notes" className={navLinkClass}>
                        Notes
                    </NavLink>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                    {isSignedIn ? (
                        <>
                            <UserButton afterSignOutUrl="/" />
                            <SignOutButton>
                                <button className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md shadow hover:bg-red-600 transition">
                                    Sign Out
                                </button>
                            </SignOutButton>
                        </>
                    ) : (
                        <SignInButton mode="modal">
                            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition">
                                Sign In
                            </button>
                        </SignInButton>
                    )}
                </div>
            </div>
        </nav>
    );
}
