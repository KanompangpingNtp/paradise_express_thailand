"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

const TourAsiaSE = () => {
  // ข้อมูลของการ์ดที่จะแสดงใน Carousel
  const cardData = [
    {
      image: "/images/03.jpg",
      title: "Grand Palace & Emerald Buddha Temple",
      description:
        "This trip is a gentle way to see Chiang Mai before breakfast.",

    },
    {
      image: "/images/03.jpg",
      title: "Long-tail Boat Tour Long-tail Boat Tour",
      description:
        "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",

    },
    {
      image: "/images/03.jpg",
      title: "Long-tail Boat Tour Long-tail Boat Tour",
      description:
        "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",

    },
    {
      image: "/images/03.jpg",
      title: "Long-tail Boat Tour Long-tail Boat Tour",
      description:
        "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",

    },
    {
      image: "/images/03.jpg",
      title: "Long-tail Boat Tour Long-tail Boat Tour",
      description:
        "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",

    },
    {
      image: "/images/03.jpg",
      title: "Long-tail Boat Tour Long-tail Boat Tour",
      description:
        "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    },
    {
      image: "/images/03.jpg",
      title: "Long-tail Boat Tour Long-tail Boat Tour",
      description:
        "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    },
    {
      image: "/images/03.jpg",
      title: "Long-tail Boat Tour Long-tail Boat Tour",
      description:
        "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    },
  ];

  return (
    <div className="container mx-auto px-2 sm:px-8 pb-10">
        <div className="text-black text-2xl sm:text-4xl font-bold text-center py-10">
          TOUR ASIA
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-3 sm:gap-8">
          {/* ใช้ slice เพื่อจำกัดให้แสดงแค่ 8 card */}
          {cardData.slice(0, 4).map((card, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:bg-gray-100 hover:shadow-md hover:shadow-yellow-500 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative h-48">
                <Image
                  src={card.image}
                  alt={card.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              {/* Content Section */}
              <div className="p-4">
                <h3 className="text-lg text-black font-bold mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center w-full text-center sm:justify-end items-center text-black mt-4">
          <a
            href="#"
            className="bg-gray-700 text-white py-3 px-5 w-full 2xl:w-40 hover:text-orange-500 hover:bg-gray-900 duration-200  rounded-2xl "
          >
            VIEW ALL
          </a>
        </div>
      </div>

  );
};

export default TourAsiaSE;
