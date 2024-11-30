import Herovideo from "./components/hero-video";
import Animtion from "./components/animtion-section-two";
import TourMonth from "./components/tour-month";
import TourSightseeing from "./components/tour-sightseeing";
import TourAsia from "./components/tour-asia";
import Transfer from "./components/transfer";
import TourAsiaSE from "./components/tour-asiaSE";
import Image from "next/image";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section>
        <Herovideo />
      </section>
      {/* Animation Section */}
      <section>
        <Animtion />
      </section>
      {/* Tour Month & Tour Sightseeing Section */}
      <section
        className="flex-1 w-full h-auto bg-center bg-cover shadow-inner shadow-black"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(240, 240, 240, 0.7), rgba(255, 255, 255, 0.5)), url('/images/TourMonth&Sightseeing/BGtour.jpg')",
        }}
      >
        <div className="flex flex-col justify-center items-center">
          <div className="container mx-auto py-10 text-white">
            <TourMonth />
            <TourSightseeing />
          </div>
        </div>
      </section>
      {/* Asia Tour Section */}
      <section>
        {/* แสดง TourAsiaSE สำหรับหน้าจอน้อยกว่า sm */}
        <div className="block container mx-auto bg-white sm:hidden">
          <TourAsiaSE />
        </div>
        {/* แสดง TourAsia สำหรับหน้าจอที่มีขนาดตั้งแต่ sm ขึ้นไป */}
        <div className="hidden sm:block ">
          <TourAsia />
        </div>
      </section>
       {/* Transfer Section */}
       {/* <section >
        <Transfer />
      </section> */}
    </div>
  );
};

export default Home;
