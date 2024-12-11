"use client"
import React, { useState, useEffect } from "react";

const CarDetailsOverlay = ({ car, isHovered }) => {
  const [isVisible, setIsVisible] = useState(false);

  // ใช้ useEffect ในการตั้งค่าแสดง overlay เมื่อมีการ hover
  useEffect(() => {
    if (isHovered) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isHovered]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute inset-0 text-white p-8 flex flex-col justify-end transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }} // ควบคุม opacity ผ่าน React state
    >
      <div className="bg-black p-4 rounded-xl opacity-80">
        <h2 className="text-3xl font-bold mb-1 text-orange-500">{car.name}</h2>
        <h2 className="text-xl font-semibold mb-3 text-orange-300">{car.description}</h2>
        <div className="space-y-2 ml-1">
          <p className="text-xl font-light">Cost: {car. price} Bath</p>
          <div className="mt-2 ml-2">
            {car.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-neutral-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsOverlay;
