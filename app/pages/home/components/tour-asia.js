"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

const CardCarousel = () => {
  // ข้อมูลของการ์ดที่จะแสดงใน Carousel
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

  // สถานะของ index ปัจจุบันที่กำลังแสดงการ์ด
  const [currentIndex, setCurrentIndex] = useState(1); // เริ่มที่ Index 1
  // สถานะตรวจสอบว่ากำลังมีการเคลื่อนไหวหรือไม่
  const [isTransitioning, setIsTransitioning] = useState(false); // ตรวจสอบการเคลื่อนไหว
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // เก็บขนาดหน้าจอ

  // ฟังก์ชันตรวจสอบขนาดหน้าจอ
  const handleResize = () => {
    setScreenWidth(window.innerWidth); // อัพเดตค่าขนาดหน้าจอเมื่อมีการเปลี่ยนแปลง
  };

  // ใช้ useEffect สำหรับฟังการเปลี่ยนแปลงขนาดหน้าจอ
  useEffect(() => {
    window.addEventListener("resize", handleResize); // ฟังการเปลี่ยนแปลงขนาดหน้าจอ
    return () => {
      window.removeEventListener("resize", handleResize); // ลบ event listener เมื่อ component ถูกทำลาย
    };
  }, []);

  // ฟังก์ชันสำหรับไปยังการ์ดถัดไป
  const handleNext = () => {
    if (isTransitioning) return; // หยุดไม่ให้เคลื่อนไหวเมื่อมีการ transition
    let increment = 1; // ค่า default สำหรับการเลื่อน 1 การ์ด
    if (screenWidth >= 1280) {
      // ขนาดหน้าจอเท่ากับหรือมากกว่าขนาด xl (1280px)
      increment = 3; // เพิ่มการ์ดทีละ 3
    } else if (screenWidth >= 1024) {
      // ขนาดหน้าจอเท่ากับหรือมากกว่าขนาด lg (1024px)
      increment = 2; // เพิ่มการ์ดทีละ 2
    }
    if (currentIndex + increment > cards.length) return; // ตรวจสอบไม่ให้เลื่อนไปเกินจำนวนการ์ด
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + increment); // เปลี่ยนไปการ์ดถัดไป
  };

  // ฟังก์ชันสำหรับย้อนกลับไปยังการ์ดก่อนหน้า
  const handlePrevious = () => {
    if (isTransitioning) return; // หยุดไม่ให้เคลื่อนไหวเมื่อมีการ transition
    let increment = 1; // ค่า default สำหรับการเลื่อน 1 การ์ด
    if (screenWidth >= 1280) {
      // ขนาดหน้าจอเท่ากับหรือมากกว่าขนาด xl (1280px)
      increment = 3; // เพิ่มการ์ดทีละ 3
    } else if (screenWidth >= 1024) {
      // ขนาดหน้าจอเท่ากับหรือมากกว่าขนาด lg (1024px)
      increment = 2; // เพิ่มการ์ดทีละ 2
    }
    if (currentIndex - increment > cards.length) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - increment); // เปลี่ยนไปการ์ดก่อนหน้า
  };

  // ตรวจสอบเมื่อเปลี่ยนตำแหน่งของการ์ดและรีเซ็ต transition
  useEffect(() => {
    setTimeout(() => setIsTransitioning(false), 500); // ใช้เวลาให้ตรงกับ duration ของ transition
  }, [currentIndex]);

  return (
    <div
      className="w-auto h-auto py-5 px-10"
      style={{ backgroundImage: "url(/images/TourAsia/bgtourasia.jpg)" }} // ภาพพื้นหลังของคาร์เทล
    >
      <div className="relative container mx-auto px-10">
        {/* หัวข้อหลักของ Carousel */}
        <div className="text-black text-2xl sm:text-4xl font-bold text-center pt-10 pb-1">
          TOUR ASIA
        </div>
        <div className="flex items-center justify-between">
          {/* ปุ่ม Previous (ย้อนกลับ) */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 1} // ปิดปุ่มเมื่อถึงการ์ดที่ 1
            className={`absolute left-[-10px] top-1/2 transform -translate-y-1/2 shadow-xl text-black rounded-full hover:bg-gray-400 transition-all duration-300 z-40 ${
              currentIndex === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
                // ปรับขนาดการเคลื่อนไหวตามขนาดหน้าจอ
                transform: `translateX(-${
                  (currentIndex - 1) *
                  (screenWidth >= 1024
                    ? screenWidth >= 1280
                      ? 100 / 3
                      : 96 / 2
                    : 88)
                }%)`,
              }}
            >
              {/* แสดงการ์ด */}
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="w-full lg:w-1/2 xl:w-1/3 p-6 rounded-lg flex-shrink-0 text-black hover:text-orange-400 shadow-lg hover:shadow-yellow-500 transition-all duration-300"
                >
                  <div
                    className="bg-cover bg-center bg-no-repeat w-full h-[25rem] flex items-center justify-center"
                    style={{ backgroundImage: "url(/images/03.jpg)" }} // รูปภาพในการ์ด
                  ></div>
                  <p className="text-xl text-center font-bold mt-7 mb-3">
                    {card.title} {/* แสดงชื่อการ์ด */}
                  </p>
                  <p className="text-gray-700 my-2 text-center text-md">
                    {card.description} {/* แสดงคำอธิบายการ์ด */}
                  </p>
                  <p className="text-gray-500 my-2 text-center text-sm">
                    {card.detailsub} {/* แสดงคำบรรยายเสริม */}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={
              currentIndex +
                (screenWidth >= 1280 ? 3 : screenWidth >= 1024 ? 2 : 1) >
              cards.length
            } // ปิดปุ่มเมื่อถึงการ์ดสุดท้ายที่แสดงได้
            className={`absolute right-[-15px] top-1/2 transform -translate-y-1/2 shadow-xl text-black rounded-full hover:bg-gray-400 transition-all duration-300 z-40 ${
              currentIndex +
                (screenWidth >= 1280 ? 3 : screenWidth >= 1024 ? 2 : 1) >
              cards.length
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <ArrowRightCircleIcon className="w-20 h-20 text-orange-300 hover:text-orange-400 transition-all duration-300" />
          </button>
        </div>
        {/* ปุ่ม "VIEW ALL" ที่อยู่ด้านล่าง */}
        <div className="flex justify-end items-center text-black mt-4">
          <a
            href="#"
            className="bg-gray-700 text-white py-3 px-5 hover:text-orange-500 hover:bg-gray-900 duration-200 rounded-2xl"
          >
            VIEW ALL {/* ลิงค์ดูทั้งหมด */}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;
