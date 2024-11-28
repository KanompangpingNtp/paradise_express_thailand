"use client"
import React, { useEffect, useRef } from "react";

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
            // ไม่เริ่มเล่นทันทีเมื่อพร้อม
            // event.target.playVideo(); // ไม่เรียก playVideo() ในตอนนี้
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

    // ลบ event listener เมื่อคอมโพเนนต์ถูกทำลาย
    return () => {
      // ไม่ต้องทำอะไรเพิ่มเติมในกรณีนี้
    };
  }, []);

  return (
    <div
      className="bg-contain bg-center bg-no-repeat w-full h-[174vh] flex items-center justify-center"
      style={{ backgroundImage: "url(/images/HD01.jpg)" }}
    >
      {/* ข้อความที่แสดงที่มุมขวาบน */}
      <div className="absolute top-[11rem] right-[4rem] p-4 text-black text-center z-10" style={{ letterSpacing: '16px' }}>
        <h1 className="text-5xl font-bold mb-2">THAILAND TOUR&TRAVEL</h1>
        <h2 className="text-5xl font-bold mb-2" style={{ letterSpacing: '19px' }}>PARADISE EXPRESS</h2>
        <p className="text-5xl">AGENCY</p>
        <p className="mt-10 text-2xl text-gray-600" style={{ letterSpacing: '1px' }}>TOUR - TRANSPORT - CUSTOM TRIP</p>
      </div>

      {/* ส่วนของ YouTube Player */}
      <div
        id="youtube-player"
        className="rounded-lg absolute top-[38rem] shadow-lg w-[169vh] h-[95vh]"
      ></div>
    </div>
  );
}

export default Herovideo;
