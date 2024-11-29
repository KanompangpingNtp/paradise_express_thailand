"use client";
import React, { useEffect, useRef } from "react";
import "./spacing.css";
import Image from "next/image";

function Herovideo() {
  const playerRef = useRef(null);

  useEffect(() => {
    let script;

    const loadYouTubeAPI = () => {
      if (!window.YT) {
        script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          initializePlayer();
        };
      } else {
        initializePlayer();
      }
    };

    const initializePlayer = () => {
      window.onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player("youtube-player", {
          videoId: "p2u9JBK4Zu0",
          playerVars: {
            loop: 1,
            playlist: "p2u9JBK4Zu0",
          },
          events: {
            onReady: (event) => {
              console.log("Video is ready");
            },
            onStateChange: (event) => {
              console.log("Player state changed:", event.data);
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.playVideo();
              }
            },
          },
        });
      };
    };

    loadYouTubeAPI();

    return () => {
      // Clean up player instance
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      // Remove script if it was created by this component
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="relative  bg-gradient-to-b from-[#838383] to-white flex flex-col shadow-inner shadow-black">
      {/* Background */}
      <div className="flex-1 w-full h-auto relative">
        <Image
          src="/images/HeroSection/toppic.png"
          alt="Background Image"
          layout="responsive" // ให้ภาพปรับตามคอนเทนเนอร์
          width={1920} // ความกว้างดั้งเดิมของภาพ
          height={1080} // ความสูงดั้งเดิมของภาพ
          className="object-cover "
        />

        {/* Text content */}
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
      {/* YouTube Player Section */}
      <div className="relative flex flex-col items-center justify-center pb-7 mb-5 sm:mb-7 md:mb-12 lg:mb-16 xl:mb-[7vh] hd:mb-[19vh]">
        <Image
          src="/images/HeroSection/object.png"
          alt="State Image"
          layout="intrinsic" // ปรับขนาดตามขนาดดั้งเดิมของภาพ
          width={500} // กำหนดค่าความกว้างดั้งเดิม (pixel)
          height={300} // กำหนดค่าความสูงดั้งเดิม (pixel)
          className="absolute left-1/2 transform -translate-x-1/2 object-contain z-0 h-auto bottom-1 sm:bottom-[-1.5vh] md:bottom-[-2.5vh] lg:bottom-[-3vh] xl:bottom-[-4vh] hd:bottom-[-7vh] w-[39vh] sm:w-[55vh] lg:w-[59vh] xl:w-[63vh] hd:w-[110vh]"
        />

        <div
          id="youtube-player"
          className="rounded-lg shadow-lg z-10 w-[45vh] h-[25vh] sm:w-[67vh] sm:h-[38vh] lg:w-[75vh] lg:h-[42.5vh] xl:w-[82vh] xl:h-[46vh] 2xl:w-[87vh] 2xl:h-[49vh] hd:w-[140vh] hd:h-[79vh]"
        ></div>
      </div>
    </div>
  );
}

export default Herovideo;
