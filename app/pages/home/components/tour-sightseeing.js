import React from "react";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

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

export default function TourSightseeing() {
  const maxVisibleItems = 3;

  return (
    <div>
      <div className="container mx-auto px-8 pb-10">
        <div className="text-black text-4xl font-bold text-center py-10">
          SIGHTSEEING TOUR
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* ใช้ slice เพื่อจำกัดให้แสดงแค่ 8 card */}
          {cardData.slice(0, 8).map((card, index) => (
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
                {/* {Toppic} */}
                <div className="flex justify-between items-center">
                  <span className="text-black text-md font-bold underline decoration-2 decoration-gray-300">
                    HIGHLIGHT
                  </span>
                  <span className="text-orange-500 text-md font-bold underline decoration-2 decoration-orange-500">
                    View more
                  </span>
                </div>
                {/* Highlight Items */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 max-h-[8rem] overflow-hidden">
                  {card.items
                    .slice(0, maxVisibleItems)
                    .map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center text-black text-sm font-bold"
                      >
                        <CheckCircleIcon className="w-6 h-6 text-orange-500 mr-1" />
                        <span className="truncate max-w-[20ch]">{item}</span>
                      </div>
                    ))}
                  {/* Show "More Items" if applicable */}
                  {card.items.length > maxVisibleItems && (
                    <div className="flex items-center text-black text-sm font-bold">
                      <CheckCircleIcon className="w-6 h-6 text-orange-500 mr-1" />
                      <span className="truncate max-w-[20ch]">Many more</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end items-center text-black mt-4">
          <a
            href="#"
            className="bg-gray-700 text-white py-3 px-5 hover:text-orange-500 hover:bg-gray-900 duration-200 me-2 rounded-2xl "
          >
            VIEW ALL
          </a>
        </div>
      </div>
    </div>
  );
}
