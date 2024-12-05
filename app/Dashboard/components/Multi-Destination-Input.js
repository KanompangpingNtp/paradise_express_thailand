import React, { useState, useEffect, useRef } from "react";
import {
  XMarkIcon,
  PlusCircleIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

const MultiDestinationInput = ({
  onDestinationsChange,
  destinations = [], // รับ destinations จาก prop
  placeholder = "Specify the tour hightlights",
  maxDestinations = 10,
  className = "",
}) => {
  const [currentDestination, setCurrentDestination] = useState("");
  const inputRef = useRef(null);

  const handleAddDestination = () => {
    const trimmedDestination = currentDestination.trim();

    // ตรวจสอบเงื่อนไขก่อนเพิ่ม
    if (
      trimmedDestination &&
      !destinations.includes(trimmedDestination) &&
      destinations.length < maxDestinations
    ) {
      onDestinationsChange([...destinations, trimmedDestination]); // ส่งค่ากลับไปที่ TourForm
      setCurrentDestination(""); // ล้าง input field
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleRemoveDestination = (destinationToRemove) => {
    onDestinationsChange(
      destinations.filter((dest) => dest !== destinationToRemove)
    ); // ส่งค่ากลับไปที่ TourForm
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddDestination();
    }
  };

  return (
    <div className={`mx-auto bg-white space-y-4 ${className}`}>
      <div className="relative">
        <label className="label flex items-center">
          <MapPinIcon className="w-5 h-5 text-sky-400" />
          <span className="label-text font-semibold text-sky-600 uppercase">
            tour hightlights
          </span>
        </label>
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            value={currentDestination}
            onChange={(e) => setCurrentDestination(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="pl-4 pr-16 py-3 w-full bg-gray-200 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
            disabled={destinations.length >= maxDestinations}
          />
          <button
            type="button"
            onClick={handleAddDestination}
            disabled={destinations.length >= maxDestinations}
            className="absolute right-1 top-1/2 -translate-y-1 transform"
          >
            <PlusCircleIcon
              className={`${
                destinations.length >= maxDestinations
                  ? "text-gray-300"
                  : "text-blue-500 hover:text-blue-600"
              } transition-colors duration-300 w-11 h-11`}
            />
          </button>
        </div>
        {destinations.length >= maxDestinations && (
          <p className="text-sm text-red-500 mt-1">
            Maximum destinations reached
          </p>
        )}
      </div>

      {destinations.length > 0 && (
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-track-blue-100 scrollbar-thumb-blue-300">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-50 text-blue-800 pl-3 pr-1 py-1 rounded-full space-x-2 animate-fadeIn"
            >
              <span className="text-sm">{destination}</span>
              <button
                type="button"
                onClick={() => handleRemoveDestination(destination)}
                className="text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100 p-1 transition-all duration-300"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDestinationInput;
