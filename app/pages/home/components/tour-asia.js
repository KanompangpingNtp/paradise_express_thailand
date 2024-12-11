"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const TourAsia = ({ tours }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // เริ่มที่ Index 1
  const [isTransitioning, setIsTransitioning] = useState(false); // ตรวจสอบการเคลื่อนไหว
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // เก็บขนาดหน้าจอ

  const handleResize = () => {
    setScreenWidth(window.innerWidth); // อัพเดตค่าขนาดหน้าจอเมื่อมีการเปลี่ยนแปลง
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize); // ฟังการเปลี่ยนแปลงขนาดหน้าจอ
    return () => {
      window.removeEventListener("resize", handleResize); // ลบ event listener เมื่อ component
      ถูกทำลาย
    };
  }, []);

  const handleNext = () => {
    if (isTransitioning) return; // หยุดไม่ให้เคลื่อนไหวเมื่อมีการ transition
    let increment = 1; // ค่า default สำหรับการเลื่อน 1 การ์ด
    if (screenWidth >= 1280) increment = 3; // เพิ่มการ์ดทีละ 3
    else if (screenWidth >= 1024) increment = 2; // เพิ่มการ์ดทีละ 2

    if (currentIndex + increment > tours.length) return; // ตรวจสอบไม่ให้เลื่อนไปเกินจำนวนการ์ด
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + increment); // เปลี่ยนไปการ์ดถัดไป
  };

  const handlePrevious = () => {
    if (isTransitioning) return; // หยุดไม่ให้เคลื่อนไหวเมื่อมีการ transition
    let increment = 1;
    if (screenWidth >= 1280) increment = 3; // เพิ่มการ์ดทีละ 3
    else if (screenWidth >= 1024) increment = 2; // เพิ่มการ์ดทีละ 2

    if (currentIndex - increment <= 0) return; // ตรวจสอบไม่ให้เลื่อนไปการ์ดที่น้อยกว่า 0
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - increment); // เปลี่ยนไปการ์ดก่อนหน้า
  };

  useEffect(() => {
    setTimeout(() => setIsTransitioning(false), 500); // รีเซ็ต transition หลังจากเปลี่ยน index
  }, [currentIndex]);

  return (
    <div
      className="w-auto h-auto py-5 px-10"
      style={{ backgroundImage: "url(/images/TourAsia/bgtourasia.jpg)" }} // ภาพพื้นหลังของคาร์เทล
    >
      <div className="relative container mx-auto px-10">
        <div className="text-black text-2xl sm:text-4xl font-bold text-center pt-10 pb-1">
          TOUR ASIA
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 1} // ปิดปุ่มเมื่อถึงการ์ดที่ 1
            className={`absolute left-[-10px] top-1/2 transform -translate-y-1/2 shadow-xl text-black rounded-full hover:bg-gray-400 transition-all duration-300 z-40 ${
              currentIndex === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ArrowLeftCircleIcon className="w-20 h-20 text-orange-300 hover:text-orange-400 transition-all duration-300" />
          </button>

          <div className="w-full overflow-hidden">
            <div
              className={`flex transition-transform duration-500 ease-in-out ${
                isTransitioning ? "" : "transition-none"
              } gap-x-3 py-5 px-9`}
              style={{
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
              {tours.map((tour, index) => (
                <div
                  key={tour.tour_id}
                  className="w-full lg:w-1/2 xl:w-1/3 p-6 rounded-lg flex-shrink-0 text-black hover:text-orange-400 shadow-lg hover:shadow-yellow-500 transition-all duration-300"
                >

                  <div
                    className="bg-cover bg-center bg-no-repeat w-full h-[25rem] flex items-center justify-center"
                    style={{
                      backgroundImage: `url(/uploads/${
                        tour.images.filter((image) => image.status === "1")[0]
                          ?.file || "default-image.jpg"
                      })`, // ใช้ภาพแรกที่มี status = 1 หรือภาพ default
                    }}
                  ></div>
                  <p className="text-xl text-center font-bold mt-7 mb-3">
                    {tour.name}
                  </p>
                  <p className="text-gray-700 my-2 text-center text-md">
                    {tour.detail}
                  </p>
                  <div className="text-orange-500 my-2 text-center text-sm">
                    <Link
                      href={{
                        pathname: `/pages/detailTour`, // ใช้ title หรือ ID ของ card
                        query: { card: JSON.stringify(tour) }, // ส่งข้อมูล card ผ่าน query string
                      }}
                      className="text-orange-500 text-md font-bold underline decoration-2 decoration-orange-500"
                    >
                      View more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={
              currentIndex +
                (screenWidth >= 1280 ? 3 : screenWidth >= 1024 ? 2 : 1) >
              tours.length
            }
            className={`absolute right-[-15px] top-1/2 transform -translate-y-1/2 shadow-xl text-black rounded-full hover:bg-gray-400 transition-all duration-300 z-40 ${
              currentIndex +
                (screenWidth >= 1280 ? 3 : screenWidth >= 1024 ? 2 : 1) >
              tours.length
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <ArrowRightCircleIcon className="w-20 h-20 text-orange-300 hover:text-orange-400 transition-all duration-300" />
          </button>
        </div>

        <div className="flex justify-center w-full text-center sm:justify-end items-center text-gray-700 mt-4">
          <Link
            href={{
              pathname: "/pages/allTour",
              query: { tours: JSON.stringify(tours) }, // ส่ง tours ใน query
            }}
            passHref
            className="text-gray-700 py-8 px-5 w-full hover:text-orange-500 hover:bg-gray-300 bg-opacity-60 duration-200 cursor-pointer uppercase tracking-normal hover:tracking-wider"
          >
            VIEW ALL TOUR ASIA
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourAsia;
