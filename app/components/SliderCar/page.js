"use client"
import React, { useState, useEffect, useRef } from "react";
import SliderDotIndicators from "./components/SliderDotIndicators";
import SliderNavButtons from "./components/SliderNavButtons";
import CarDetailsOverlay from "./components/CarDetailsOverlay";
import Link from "next/link";

const CarSlider = ({ cars = [] }) => {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);
  const slideIntervalRef = useRef(null);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    if (!isHovered && cars.length > 0) {
      slideIntervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentCarIndex((prevIndex) => (prevIndex + 1) % cars.length);
      }, 4000);
    }

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [isHovered, cars]);

  const handleNextCar = () => {
    setDirection(1);
    setCurrentCarIndex((prevIndex) => (prevIndex + 1) % cars.length);
  };

  const handlePrevCar = () => {
    setDirection(-1);
    setCurrentCarIndex(
      (prevIndex) => (prevIndex - 1 + cars.length) % cars.length
    );
  };

  // การแสดงผลในกรณีไม่มีรถ
  if (!cars || cars.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500 text-lg">No cars available to display.</p>
      </div>
    );
  }

  const currentCar = cars[currentCarIndex];

  return (
    <div className="w-full sm:h-screen flex items-center justify-center pb-2">
      <div className="w-full h-full mx-auto flex flex-col xl:flex-row rounded-2xl overflow-hidden">
        {/* Left Side */}
        <div className="xl:w-1/2 p-20 text-white flex flex-col justify-center items-center">
          <div className="m-auto pl-0 xl:pl-10 text-center xl:text-left">
            <h1 className="text-xl sm:text-4xl xl:text-5xl mb-12 text-black uppercase tracking-tight">
              THAILAND <br className="hidden xl:block" />
              <span className="font-black half-underline">TRANSFER</span>
            </h1>

            <p className="text-md text-gray-700 mb-4 sm:mb-8 sm:text-xl leading-relaxed">
              Pickup and car rental service for travel,
              <br className="hidden xl:block" /> with professional drivers for
              pick-up and <br className="hidden xl:block" />
              high-quality vehicles, ensuring a comfortable and{" "}
              <br className="hidden xl:block" /> safe journey for you.
            </p>
            <Link
              href={{
                pathname: `/pages/allTransfer`,
              }}
              className="w-auto text-orange-500 py-4 px-8 rounded-lg border-orange-500 border-2
             transition-all duration-300
            uppercase font-bold tracking-wider
            transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              BOOK NOW
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div
          className="hidden sm:block xl:w-1/2 relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={
              currentCar.image
                ? `/uploads/${currentCar.image}`
                : "/default-image.jpg"
            }
            alt={currentCar.name || "Car"}
            className="w-full min-h-screen xl:min-h-screen object-cover hover:grayscale-0 transition-all rounded-2xl duration-500"
          />

          <CarDetailsOverlay
            car={{
              name: currentCar.name,
              description: currentCar.description,
              price: currentCar.pricePerDay,
              features: currentCar.features,
            }}
            isHovered={isHovered}
          />

          <SliderNavButtons onPrev={handlePrevCar} onNext={handleNextCar} />

          <SliderDotIndicators
            totalSlides={cars.length}
            currentIndex={currentCarIndex}
            onDotClick={setCurrentCarIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default CarSlider;
