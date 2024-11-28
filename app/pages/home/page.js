// หน้า Home
import Herovideo from "./components/hero-video";
import Animtion from "./components/animtion-section-two";
import TourMonth from "./components/tour-month";
import TourSightseeing from "./components/tour-sightseeing";
import TourAsia from "./components/tour-asia";
import Transfer from "./components/transfer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <Herovideo />
      <Animtion />
      <div
        className="w-auto h-auto "
        style={{ backgroundImage: "url(/images/BGtour.jpg)" }}
      >
        <TourMonth />
        <TourSightseeing />
      </div>
      <TourAsia />
      <Transfer/>
    </div>
  );
};

export default Home;
