"use client";
import React, { useEffect, useRef } from "react";
import "./spacing.css";

function Herovideo() {
  const playerRef = useRef(null);

  useEffect(() => {
    // โหลด YouTube API
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.body.appendChild(script);

    // สร้าง player หลัง API โหลด
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: "p2u9JBK4Zu0", // ใส่ VIDEO_ID
        playerVars: {
          loop: 1, // เปิดการเล่นซ้ำ
          playlist: "p2u9JBK4Zu0", // ตั้งค่าให้ videoId ซ้ำใน playlist เพื่อให้ loop ทำงาน
        },
        events: {
          onReady: (event) => {
            console.log("Video is ready");
          },
          onStateChange: (event) => {
            console.log("Player state changed:", event.data);
            // ตรวจสอบสถานะเมื่อวิดีโอเล่นจบ
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo(); // เล่นซ้ำ
            }
          },
        },
      });
    };

    return () => {
      // Clean-up function if necessary
    };
  }, []);

  return (
    <div className="relative w-full h-auto bg-gradient-to-b from-[#838383] to-white flex flex-col">
      {/* พื้นหลัง */}
      <div className="flex-1 w-full h-auto relative">
        <img
          src="/images/HeroSection/toppic.png"
          alt="Background Image"
          className="w-full h-auto object-cover"
        />
        {/* ข้อความที่แสดงที่มุมขวาบน */}
        <div className="absolute top-[1rem] xs:top-[1rem] sm:top-[2rem] md:top-[3rem] lg:top-[4rem] xl:top-[6rem] 2xl:top-[7rem] 3xl:top-[7rem] hd:top-[7rem] right-[1rem] sm:right-[1rem] md:right-[1rem] lg:right-[1rem] xl:right-[1rem] 2xl:right-[2rem] 3xl:right-[3rem] hd:right-[5rem] text-black text-center z-10 text-spacing-1">
          <h1 className="text-[9px] sm:text-xs md:text-sm lg:text-lg xl:text-2xl 2xl:text-3xl 3xl:text-4xl hd:text-5xl font-bold mb-2">
            THAILAND TOUR&TRAVEL
          </h1>
          <h2 className="text-[9px] sm:text-xs md:text-sm lg:text-lg xl:text-2xl 2xl:text-3xl 3xl:text-4xl hd:text-5xl font-bold mb-2 text-spacing-2">
            PARADISE EXPRESS
          </h2>
          <p className="text-[9px] sm:text-xs md:text-sm lg:text-lg xl:text-2xl 2xl:text-3xl 3xl:text-4xl hd:text-5xl">
            AGENCY
          </p>
          <p
            className="mt-2 sm:mt-8 md:mt-9 lg:mt-10 text-[6px] sm:text-xs md:text-xs lg:text-md xl:text-lg 2xl:text-lg 3xl:text-xl hd:text-2xl text-gray-600"
            style={{ letterSpacing: "1px" }}
          >
            TOUR - TRANSPORT - CUSTOM TRIP
          </p>
        </div>
      </div>
      {/* ส่วนของ YouTube Player */}
      <div className="relative flex flex-col items-center justify-center pb-7 mb-5 sm:mb-7 md:mb-12 lg:mb-16 xl:mb-[7vh] hd:mb-[19vh]">
        {/* รูปภาพ state ที่โผล่ออกมาจากข้างวิดีโอ */}
        <img
          src="/images/HeroSection/object.png"
          alt="State Image"
          className="absolute left-1/2 transform -translate-x-1/2 object-contain z-0 h-auto bottom-0 sm:bottom-[-1.5vh] md:bottom-[-2.5vh] lg:bottom-[-3vh] xl:bottom-[-4vh] hd:bottom-[-7vh] w-[45vh] sm:w-[55vh] lg:w-[59vh] xl:w-[63vh] hd:w-[110vh]"
        />

        {/* YouTube Player */}
        <div
          id="youtube-player"
          className="rounded-lg shadow-lg z-10 w-[50vh] h-[28vh] sm:w-[67vh] sm:h-[38vh] lg:w-[75vh] lg:h-[42.5vh] xl:w-[82vh] xl:h-[46vh] 2xl:w-[87vh] 2xl:h-[49vh] hd:w-[140vh] hd:h-[79vh]"
        ></div>
      </div>
    </div>
  );
}

export default Herovideo;
