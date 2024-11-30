// CloudBackground.js
"use client";
import React, { useState, useEffect } from "react";

// Component สำหรับสร้างพื้นหลังแบบเมฆ
const CloudBackground = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // ใช้ useEffect เพื่อให้โค้ดทำงานหลังจากโหลด DOM
  }, []);

  if (!isClient) return null; // ตรวจสอบว่าอยู่ในฝั่ง client

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white/30 rounded-full blur-3xl"
          style={{
            width: `${200 + Math.floor(Math.random() * 600)}px`,
            height: `${100 + Math.floor(Math.random() * 300)}px`,
            top: `${Math.floor(Math.random() * 100)}%`,
            left: `${Math.floor(Math.random() * 100)}%`,
            transform: `rotate(${Math.floor(Math.random() * 360)}deg)`,
            animation: `float ${
              10 + Math.floor(Math.random() * 20)
            }s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default CloudBackground;
