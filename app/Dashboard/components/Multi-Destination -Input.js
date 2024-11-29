import React, { useState, useRef, useEffect } from 'react';
import {
  XMarkIcon,
  PlusCircleIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

const MultiDestinationInput = ({
  onDestinationsChange,
  initialDestinations = [],
  placeholder = "Where do you want to go?",
  maxDestinations = 10,
  className = '',
}) => {
  const [destinations, setDestinations] = useState(initialDestinations);
  const [currentDestination, setCurrentDestination] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // เรียก callback function เมื่อ destinations เปลี่ยนแปลง
    if (onDestinationsChange) {
      onDestinationsChange(destinations);
    }
  }, [destinations, onDestinationsChange]);

  const handleAddDestination = () => {
    const trimmedDestination = currentDestination.trim();

    // ตรวจสอบเงื่อนไขก่อนเพิ่ม
    if (
      trimmedDestination &&
      !destinations.includes(trimmedDestination) &&
      destinations.length < maxDestinations
    ) {
      const newDestinations = [...destinations, trimmedDestination];
      setDestinations(newDestinations);
      setCurrentDestination('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleRemoveDestination = (destinationToRemove) => {
    setDestinations(destinations.filter(dest => dest !== destinationToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddDestination();
    }
  };

  return (
    <div className={`max-w-md mx-auto bg-white rounded-3xl space-y-4 ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPinIcon className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            value={currentDestination}
            onChange={(e) => setCurrentDestination(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="pl-10 pr-16 py-3 w-full border-2 border-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
            disabled={destinations.length >= maxDestinations}
          />
          <button
            onClick={handleAddDestination}
            disabled={destinations.length >= maxDestinations}
            className="absolute right-1 top-1/2 -translate-y-1/2 transform"
          >
            <PlusCircleIcon
              className={`
                ${destinations.length >= maxDestinations
                  ? 'text-gray-300'
                  : 'text-blue-500 hover:text-blue-600'
                }
                transition-colors duration-300 w-11 h-11
              `}
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
                onClick={() => handleRemoveDestination(destination)}
                className="text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100 p-1 transition-all duration-300"
              >
                <XMarkIcon className='w-5 h-5' />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDestinationInput;
