import React from "react";
import TourCard from "@/app/components/TourCard";
import Link from "next/link";

const cardData = [
  {
    image: "/images/03.jpg",
    title: "Grand Palace & Emerald Buddha Temple",
    description:
      "This trip is a gentle way to see Chiang Mai before breakfast.",
    items: [
      "Temple tour",
      "Photography spots",
      "Temple tour",
      "Photography spots",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "Boat ride",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "Boat ride",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "Boat ride",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "Boat ride",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "Boat ride",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "Boat ride",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "Boat ride",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
];

export default function TourMonth() {
  return (
    <div className="container mx-auto px-2 sm:px-8 pb-10">
      <div className="text-black text-2xl sm:text-4xl font-bold text-center py-10">
        TOUR OF THE MONTH
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-3 sm:gap-8">
        {/* ใช้ slice เพื่อจำกัดให้แสดงแค่ 8 card */}
        {cardData.slice(0, 8).map((card, index) => (
          <TourCard key={index} card={card} />
        ))}
      </div>

      <div className="flex justify-center w-full text-center sm:justify-end items-center text-black mt-4">
        <Link href={`/pages/allTour/TourMonth`} passHref className="bg-gray-700 text-white py-3 px-5 w-full 2xl:w-40 hover:text-orange-500 hover:bg-gray-900 duration-200 rounded-2xl cursor-pointer">
            VIEW ALL
        </Link>
      </div>

    </div>
  );
}
