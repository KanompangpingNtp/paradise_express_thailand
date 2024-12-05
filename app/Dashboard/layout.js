// layout.js
"use client";
import React, { useState } from "react";
import CloudBackground from "./components/CloudBackground-Component";
import Sidebar from "./components/Sidebar-Component";
import Navbar from "./components/Navbar-Component";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 relative overflow-hidden">
      {/* Cloud Background */}
      <CloudBackground />

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Navbar */}
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        {/* Page Content */}
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md backdrop-blur-xl bg-white/60 container mx-auto min-h-screen">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
