import React from "react";
import Image from "next/image";

function Transfer() {
  return (
    <div className="w-full h-auto relative">
      {/* Background */}
      <div className="w-full h-auto">
        <Image
          src="/images/Transfer/bgtranfer.jpg"
          alt="Background Image"
          layout="responsive"
          width={1920}
          height={1080}
          className="object-cover"
        />
        {/* Overlay Content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center"
          style={{
            padding: "20px", // เพิ่ม padding สำหรับข้อความ
          }}
        >
          {/* Title */}
          <div
            className="text-black text-2xl sm:text-4xl font-bold text-center py-10">
            TRANSFER
          </div>
          {/* Image */}
          <div
            style={{
              width: "60%", // ปรับขนาดความกว้าง
              maxWidth: "500px", // จำกัดขนาดใหญ่สุด
            }}
          >
            <Image
              src="/images/Transfer/tranfer.png"
              alt="Car Image"
              layout="responsive"
              width={500}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transfer;
