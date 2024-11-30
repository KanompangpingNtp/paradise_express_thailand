// DashboardContent.js
"use client";
import React from "react";

const DashboardContent = ({ activeMenu }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 p-6">
      {/* ส่วนหัวของ Content */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 backdrop-blur-xl bg-white/60">
        <h2 className="text-3xl font-bold text-sky-600">Welcome Dashboard</h2>
        <p className="text-gray-600 mt-4">Dash Board GM SKY</p>
      </div>

      {/* ตัวอย่างข้อมูล Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-l-4 border-sky-500">
          <h3 className="text-xl font-semibold text-sky-600">Ex.Data 1</h3>
          <p className="text-gray-600 mt-4">Details</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-l-4 border-sky-500">
          <h3 className="text-xl font-semibold text-sky-600">Ex.Data 2</h3>
          <p className="text-gray-600 mt-4">Details</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-l-4 border-sky-500">
          <h3 className="text-xl font-semibold text-sky-600">Ex.Data 3</h3>
          <p className="text-gray-600 mt-4">Details</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
