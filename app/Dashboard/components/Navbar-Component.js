// Navbar.js
"use client";
import React from "react";
import { Bars3Icon, BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Navbar Component
const Navbar = ({ setIsSidebarOpen }) => {
  return (
    <nav className="bg-white/70 backdrop-blur-xl shadow-sm p-4 flex justify-between items-center border-b border-sky-100/50">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden text-sky-600"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
      <div className="flex-1 mx-4 relative">
        <input
          type="text"
          placeholder="Float through dashboard..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-sky-100/50 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white/50 text-gray-800 transition-all duration-200 hover:bg-white/70"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sky-400" />
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative hover:bg-sky-50/50 p-2 rounded-full transition-all">
          <BellIcon className="h-6 w-6 text-sky-500" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
        </button>
        <div className="h-6 border-r border-sky-200 mx-2"></div>
        <div className="flex items-center space-x-3">
          <img
            src="https://preview.redd.it/s2-spoilers-do-you-think-jinx-cut-her-own-hair-or-do-you-v0-dlgn692vihpd1.jpeg?auto=webp&s=a17129cebee69242aec74ac93a3bb4f39247e399"
            alt="Profile"
            className="rounded-full h-10 w-10 border-2 border-sky-100 hover:scale-105 transition-transform shadow-md"
          />
          <div>
            <span className="block text-sm font-semibold text-gray-800 drop-shadow-sm">
              Jinx
            </span>
            <span className="block text-xs text-gray-500">Admin</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
