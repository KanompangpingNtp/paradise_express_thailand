import React from "react";
import Image from "next/image";
import Link from "next/link";

function Animation() {
  return (
    <div
      className="flex w-full bg-cover bg-center sm:bg-opacity-100 bg-opacity-80"
      style={{
        backgroundImage: `linear-gradient(
          rgba(255, 255, 255, 0.5),
          rgba(255, 255, 255, 0.3)
        ), url(/images/AnimtionSection/mapnew2x.png)`,
      }}
    >
      {/* Left Side - Video Section */}
      <div className="w-full sm:w-1/2 min-h-full">
        <video className="object-cover h-full w-full" autoPlay muted loop>
          <source src="/video/forN.webm" type="video/webm" />
        </video>
      </div>

      {/* Right Side - Images Section */}
      <div className="w-1/2 hidden sm:flex flex-col justify-center items-center min-h-full">
        {/* Image 1 */}
        <Link
          href="/pages/allTour/tour-month"
          className="flex justify-center lg:justify-center w-full h-auto mb-1"
        >
          <Image
            src="/images/AnimtionSection/buttoms/001.png"
            alt="Graphic 1"
            layout="intrinsic"
            width={300}
            height={300}
            className="object-cover h-auto w-[20vh] 2xl:w-auto"
          />
        </Link>

        {/* Image 2 */}
        <Link
          href="/pages/allTour/tour-sightseeing"
        className="flex justify-center lg:justify-start w-full h-auto mb-1 lg:pl-10 xl:pl-20">
          <Image
            src="/images/AnimtionSection/buttoms/002.png"
            alt="Graphic 2"
            layout="intrinsic"
            width={300}
            height={300}
            className="object-cover h-auto w-[20vh] 2xl:w-auto"
          />
        </Link>

        {/* Image 3 */}
        <Link href="/pages/customized" className="flex justify-center lg:justify-center w-full h-auto mb-1">
          <Image
            src="/images/AnimtionSection/buttoms/003.png"
            alt="Graphic 3"
            layout="intrinsic"
            width={300}
            height={300}
            className="object-cover h-auto w-[20vh] 2xl:w-auto"
          />
        </Link>

        {/* Image 4 */}
        <Link href="/pages/customized" className="flex justify-center lg:justify-end w-full h-auto mb-1 lg:pr-10 xl:pr-20">
          <Image
            src="/images/AnimtionSection/buttoms/004.png"
            alt="Graphic 4"
            layout="intrinsic"
            width={300}
            height={300}
            className="object-cover h-auto w-[20vh] 2xl:w-auto"
          />
        </Link>
      </div>
    </div>
  );
}

export default Animation;
