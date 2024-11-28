"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

const CardCarousel = () => {
  const cards = [
    {
      id: 1,
      title: "Card 1",
      description: "Description for Card 1",
      detailsub:
        "Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1",
      color: "bg-blue-100",
    },
    {
      id: 2,
      title: "Card 2",
      description: "Description for Card 2",
      detailsub:
        "Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1",
      color: "bg-green-100",
    },
    {
      id: 3,
      title: "Card 3",
      description: "Description for Card 3",
      detailsub:
        "Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1",
      color: "bg-red-100",
    },
    {
      id: 4,
      title: "Card 4",
      description: "Description for Card 4",
      detailsub:
        "Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1",
      color: "bg-yellow-100",
    },
    {
      id: 5,
      title: "Card 5",
      description: "Description for Card 5",
      detailsub:
        "Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1",
      color: "bg-purple-100",
    },
    {
      id: 6,
      title: "Card 6",
      description: "Description for Card 6",
      detailsub:
        "Description for Card 1 Description for Card 1 Description for Card 1 Description for Card 1",
      color: "bg-pink-100",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(1); // เริ่มที่ Index 1
  const [isTransitioning, setIsTransitioning] = useState(false); // ตรวจสอบการเคลื่อนไหว

  const handleNext = () => {
    if (isTransitioning || currentIndex === (cards.length - 2)) return; // หยุดไม่ให้เคลื่อนไหวเมื่อถึงการ์ดที่ 6
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    if (isTransitioning || currentIndex === 1) return; // หยุดไม่ให้เคลื่อนไหวเมื่อถึงการ์ดที่ 1
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // ตรวจสอบเมื่อเปลี่ยนตำแหน่งและรีเซ็ตแบบไม่มี Transition
  useEffect(() => {
    setTimeout(() => setIsTransitioning(false), 500); // ใช้เวลาให้ตรงกับ duration ของ transition
  }, [currentIndex]);

  return (
    <div
      className="w-auto h-auto py-5 px-10"
      style={{ backgroundImage: "url(/images/bgtourasia.jpg)" }}
    >
      <div className="relative container mx-auto px-10">
        <div className="text-black text-4xl font-bold text-center pb-5">
          TOUR ASIA
        </div>
        <div className="flex items-center justify-between">
          {/* ปุ่ม Previous */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 1} // ปิดปุ่มเมื่อถึงการ์ดที่ 1
            className={`absolute left-[-10px] top-1/2 transform -translate-y-1/2 shadow-xl text-black rounded-full hover:bg-gray-400 transition-all duration-300 z-40 ${currentIndex === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <ArrowLeftCircleIcon className="w-20 h-20 text-orange-300 hover:text-orange-400 transition-all duration-300" />
          </button>

          {/* พื้นที่ Carousel */}
          <div className="w-full overflow-hidden">
            <div
              className={`flex transition-transform duration-500 ease-in-out ${
                isTransitioning ? "" : "transition-none"
              } gap-x-3 py-5 px-9`}
              style={{
                transform: `translateX(-${(currentIndex - 1) * (100 / 3)}%)`,
              }}
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="w-1/3 p-6 rounded-lg flex-shrink-0 text-black hover:text-orange-400 shadow-lg hover:shadow-yellow-500 transition-all duration-300"
                >
                  <div
                    className="bg-cover bg-center bg-no-repeat w-full h-[25rem] flex items-center justify-center"
                    style={{ backgroundImage: "url(/images/03.jpg)" }}
                  ></div>
                  <p className="text-xl text-center font-bold mt-7 mb-3">
                    {card.title}
                  </p>
                  <p className="text-gray-700 my-2 text-center text-md">
                    {card.description}
                  </p>
                  <p className="text-gray-500 my-2 text-center text-sm">
                    {card.detailsub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ปุ่ม Next */}
          <button
            onClick={handleNext}
            disabled={currentIndex === cards.length} // ปิดปุ่มเมื่อถึงการ์ดที่ 6
            className={`absolute right-[-15px] top-1/2 transform -translate-y-1/2 shadow-xl text-black rounded-full hover:bg-gray-400 transition-all duration-300 z-40 ${currentIndex === (cards.length - 2) ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <ArrowRightCircleIcon className="w-20 h-20 text-orange-300 hover:text-orange-400 transition-all duration-300" />
          </button>
        </div>
        <div className="flex justify-end items-center text-black mt-4">
          <a
            href="#"
            className="bg-gray-700 text-white py-3 px-5 hover:text-orange-500 hover:bg-gray-900 duration-200 rounded-2xl"
          >
            VIEW ALL
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;
