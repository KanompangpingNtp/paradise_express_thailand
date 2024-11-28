import React from "react";

function Animation() {
  return (
    <div
      className=" bg-cover bg-no-repeat w-full h-[80vh] flex items-center justify-center relative"
      style={{ backgroundImage: "url(/images/mapnew2x.png)" }}
    >
      {/* Video Section */}
      <video
        className="absolute left-60 top-1/2 transform -translate-y-1/2 w-[80vh] h-[80vh] object-cover"
        autoPlay
        muted
        loop
      >
        <source src="/video/forN.webm" type="video/webm" />
      </video>

       {/* Image Section */}
       <img
        src="/images/buttoms/001.png"
        alt="Additional Graphic"
        className="absolute transform -translate-y-1/2 w-[30vh] h-auto object-contain"
        style={{ right: "25rem", top: "8rem" }}
      />
       <img
        src="/images/buttoms/002.png"
        alt="Additional Graphic"
        className="absolute transform -translate-y-1/2 w-[30vh] h-auto object-contain"
        style={{ right: "32rem", top: "16rem" }}
      />
      <img
        src="/images/buttoms/003.png"
        alt="Additional Graphic"
        className="absolute transform -translate-y-1/2 w-[30vh] h-auto object-contain"
        style={{ right: "25rem", top: "24rem" }}
      />
      <img
        src="/images/buttoms/004.png"
        alt="Additional Graphic"
        className="absolute transform -translate-y-1/2 w-[30vh] h-auto object-contain"
        style={{ right: "17rem", top: "32rem" }}
      />
    </div>
  );
}

export default Animation;
