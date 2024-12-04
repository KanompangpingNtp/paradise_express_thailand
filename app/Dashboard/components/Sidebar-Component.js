// Sidebar.js
"use client";
import React from "react";
import Link from "next/link";
import {
  HomeIcon,
  ChartPieIcon,
  UsersIcon,
  CogIcon,
  XMarkIcon,
  SwatchIcon,
  DocumentPlusIcon,
  ClipboardDocumentListIcon
} from "@heroicons/react/24/outline";

// Sidebar Component
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, activeMenu, setActiveMenu }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-72 bg-white/80 backdrop-blur-xl text-gray-800 transition-all duration-300 ease-in-out shadow-2xl ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 rounded-r-3xl border-r border-sky-100/50`}
    >
      {/* Header ส่วนบนของ Sidebar */}
      <div className="flex items-center justify-between p-6 border-b border-sky-100/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-sky-400 rounded-full flex items-center justify-center shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-xl font-bold text-sky-600 drop-shadow-sm">
            GM SKY
          </div>
        </div>
        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Navigation ส่วนลิ้งค์เมนู */}
      <nav className="p-4 space-y-2">
        <ul>
          {[
            { icon: HomeIcon, label: "Dashboard", href: "/Dashboard" },
            { icon: SwatchIcon, label: "Tours section", href: "/Dashboard/tour_section_manage" },
            {
              icon: DocumentPlusIcon,
              label: "Tours create",
              href: "/Dashboard/create_tour",
            },

            { icon: ClipboardDocumentListIcon, label: "Tours lists", href: "/Dashboard/show_tour_list" },
          ].map(({ icon: Icon, label, href }) => (
            <li key={label}>
              <Link
                href={href}
                onClick={() => setActiveMenu(label)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  activeMenu === label
                    ? "bg-sky-100/70 text-sky-700 shadow-sm"
                    : "hover:bg-sky-50/50 text-gray-600 hover:text-sky-600"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    activeMenu === label ? "text-sky-600" : "text-gray-400"
                  }`}
                />
                <span className="font-medium">{label}</span>
                {activeMenu === label && (
                  <span className="ml-auto h-2 w-2 bg-sky-500 rounded-full animate-pulse"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
