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

  const [currentIndex, setCurrentIndex] = useState(1); // เริ่มที่ Index 1 (สำหรับการทำงานวน)
  const [isTransitioning, setIsTransitioning] = useState(false); // ตรวจสอบการเคลื่อนไหว

  const extendedCards = [
    cards[cards.length - 1], // เพิ่ม Card สุดท้ายไปด้านหน้า
    ...cards,
    cards[0],
    cards[1], // เพิ่ม Card แรกไปท้ายสุด
    cards[2], // เพิ่ม Card แรกไปท้ายสุด
  ];

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // ตรวจสอบเมื่อเปลี่ยนตำแหน่งและรีเซ็ตแบบไม่มี Transition
  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(cards.length);
      }, 500); // ใช้เวลาตรงกับ duration ของ transition
    } else if (currentIndex === cards.length + 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500);
    } else {
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [currentIndex, cards.length]);

  return (
    <div
      className="w-auto h-auto py-5"
      style={{ backgroundImage: "url(/images/bgtourasia.jpg)" }}
    >
      <div className="relative container mx-auto px-5"> {/* ใช้ container ที่นี่ */}
        <div className="text-black text-4xl font-bold text-center pb-5">
          TOUR ASIA
        </div>
        <div className="flex items-center justify-between">
          {/* ปุ่ม Previous */}
          <button
            onClick={handlePrevious}
            className="absolute left-[-15px] top-1/2 transform -translate-y-1/2 shadow-xl text-black rounded-full hover:bg-gray-400 transition-all duration-300 z-40"
          >
            <ArrowLeftCircleIcon className="w-20 h-20 text-orange-300 hover:text-orange-400 transition-all duration-300" />
          </button>

          {/* พื้นที่ Carousel */}
          <div className="w-full overflow-hidden">
            <div
              className={`flex transition-transform duration-500 ease-in-out ${
                isTransitioning ? "" : "transition-none"
              } gap-x-3 py-5 px-9`} // เพิ่ม gap-x-4 เพื่อให้การ์ดมีระยะห่างกัน
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`, // แสดง 3 การ์ดในแต่ละครั้ง
              }}
            >
              {extendedCards.map((card, index) => {
                const isEven = index % 2 === 0; // เช็คว่าเป็นเลขคู่หรือไม่
                return (
                  <div
                    key={index}
                    className={`w-1/3 p-6 rounded-lg flex-shrink-0 text-black hover:text-orange-400 shadow-lg hover:shadow-yellow-500 transition-all duration-300`} // เพิ่ม padding ที่การ์ด
                  >
                    <div
                      className={`bg-cover bg-center bg-no-repeat w-full h-[25rem] flex items-center justify-center ${
                        isEven ? "" : "rounded-full" // เพิ่ม rounded-full ถ้าเป็นเลขคู่
                      }`}
                      style={{ backgroundImage: "url(/images/03.jpg)" }} // รูปภาพพื้นหลัง
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
                );
              })}
            </div>
          </div>

          {/* ปุ่ม Next */}
          <button
            onClick={handleNext}
            className="absolute right-[-15px] top-1/2 transform -translate-y-1/2 shadow-xl text-black rounded-full hover:bg-gray-400 transition-all duration-300 z-40"
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
