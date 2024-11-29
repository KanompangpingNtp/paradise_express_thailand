import React from "react";
import Image from "next/image";

function Animation() {
  return (
    <div className="flex-1 w-full h-auto relative">
      {/* Background Image */}
      <Image
        src="/images/AnimtionSection/mapnew2x.png"
        alt="Background Image"
        layout="responsive" // ปรับขนาดตาม container
        width={1920} // ความกว้างดั้งเดิมของภาพ
        height={1080} // ความสูงดั้งเดิมของภาพ
        className="object-cover shadow-2xl"
      />

      {/* Video Section */}
      <video
        className="absolute top-1/2 transform -translate-y-1/2 object-cover h-auto left-[6vh] w-[22vh] sm:left-[9vh] sm:w-[32vh] md:left-[7vh] md:w-[30vh] lg:left-[8vh] lg:w-[34vh] xl:left-[8vh] xl:w-[35vh] 2xl:left-[9vh] 2xl:w-[38vh] hd:left-[17vh] hd:w-[72vh]"
        autoPlay
        muted
        loop
      >
        <source src="/video/forN.webm" type="video/webm" />
      </video>

      {/* Additional Graphics */}
      <Image
        src="/images/AnimtionSection/buttoms/001.png"
        alt="Graphic 1"
        layout="intrinsic" // ปรับขนาดตามไฟล์ต้นฉบับ
        width={300} // ขนาดต้นฉบับ (px)
        height={300} // ขนาดต้นฉบับ (px)
        className="absolute transform -translate-y-1/2 object-cover h-auto w-[9vh] right-[10vh] top-[5vh] sm:w-[14vh] sm:right-[14vh] sm:top-[7vh] md:w-[13vh] md:right-[13vh] md:top-[7vh] lg:w-[15vh] lg:right-[13vh] lg:top-[8vh] xl:w-[16vh] xl:right-[13vh] xl:top-[8vh] 2xl:w-[18vh] 2xl:right-[14vh] 2xl:top-[9vh] hd:w-[32vh] hd:right-[30vh] hd:top-[18vh]"
      />
      <Image
        src="/images/AnimtionSection/buttoms/002.png"
        alt="Graphic 2"
        layout="intrinsic"
        width={300}
        height={300}
        className="absolute transform -translate-y-1/2 object-cover h-auto w-[9vh] right-[14vh] top-[9vh] sm:w-[14vh] sm:right-[20vh] sm:top-[13vh] md:w-[13vh] md:right-[18vh] md:top-[12.5vh] lg:w-[15vh] lg:right-[19vh] lg:top-[14.5vh] xl:w-[16vh] xl:right-[20vh] xl:top-[14.5vh] 2xl:w-[18vh] 2xl:right-[21vh] 2xl:top-[16.5vh] hd:w-[32vh] hd:right-[42vh] hd:top-[31vh]"
      />
      <Image
        src="/images/AnimtionSection/buttoms/003.png"
        alt="Graphic 3"
        layout="intrinsic"
        width={300}
        height={300}
        className="absolute transform -translate-y-1/2 object-cover h-auto w-[9vh] right-[10vh] top-[13vh] sm:w-[14vh] sm:right-[14vh] sm:top-[19vh] md:w-[13vh] md:right-[13vh] md:top-[18vh] lg:w-[15vh] lg:right-[13vh] lg:top-[21vh] xl:w-[16vh] xl:right-[13vh] xl:top-[21vh] 2xl:w-[18vh] 2xl:right-[14vh] 2xl:top-[24vh] hd:w-[32vh] hd:right-[30vh] hd:top-[44vh]"
      />
      <Image
        src="/images/AnimtionSection/buttoms/004.png"
        alt="Graphic 4"
        layout="intrinsic"
        width={300}
        height={300}
        className="absolute transform -translate-y-1/2 object-cover h-auto w-[9vh] right-[6vh] top-[17vh] sm:w-[14vh] sm:right-[8vh] sm:top-[25vh] md:w-[13vh] md:right-[7vh] md:top-[23.5vh] lg:w-[15vh] lg:right-[7vh] lg:top-[27.5vh] xl:w-[16vh] xl:right-[6vh] xl:top-[27.5vh] 2xl:w-[18vh] 2xl:right-[7vh] 2xl:top-[31.5vh] hd:w-[32vh] hd:right-[18vh] hd:top-[57vh]"
      />
    </div>
  );
}

export default Animation;
