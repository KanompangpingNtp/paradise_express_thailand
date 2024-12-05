import Herovideo from "./components/hero-video";
import Animtion from "./components/animtion-section-two";
import TourAll from "./components/tour-all";
import TourAsia from "./components/tour-asia";
import Transfer from "./components/transfer";

// ฟังก์ชันที่ทำการ fetch ข้อมูลจาก API
async function getToursData() {
  const response = await fetch("http://localhost:3000/api/tours/tours_data");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.tours || [];
}

const Home = async () => {
  const tours = await getToursData(); // ดึงข้อมูลจาก API

  // กรองข้อมูล tours ตาม section_name
  const tourBySection = tours.reduce((acc, tour) => {
    if (!acc[tour.section_name]) {
      acc[tour.section_name] = [];
    }
    acc[tour.section_name].push(tour);
    return acc;
  }, {});

  // กรองข้อมูลสำหรับ TourAsia เท่านั้น
  const tourAsiaData = tourBySection["Tour Asia"] || [];

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
        id="tour-packages"
        className="flex-1 w-full h-auto bg-center bg-cover shadow-inner shadow-black"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(240, 240, 240, 0.7), rgba(255, 255, 255, 0.5)), url('/images/TourMonth&Sightseeing/BGtour.jpg')",
        }}
      >
        <div className="flex flex-col justify-center items-center pt-20">
          <div className="container mx-auto text-white">
            {/* แสดงผลแต่ละ section ตาม section_name แต่ไม่แสดง TourAsia */}
            {Object.keys(tourBySection).map(
              (sectionName, index) =>
                sectionName !== "Tour Asia" && (
                  <div key={index}>
                    <TourAll
                      sectionName={sectionName}
                      tours={tourBySection[sectionName]}
                    />
                  </div>
                )
            )}
          </div>
        </div>
      </section>

      {/* Asia Tour Section */}
      <section>
        {/* แสดง TourAll สำหรับหน้าจอน้อยกว่า sm */}
        <div className="block container mx-auto bg-white sm:hidden shadow-inner shadow-black">
          <TourAll
            sectionName="TourAsia"
            tours={tourAsiaData} // ส่งข้อมูลที่เกี่ยวข้องกับ TourAsia
          />
        </div>

        {/* แสดง TourAsia สำหรับหน้าจอที่มีขนาดตั้งแต่ sm ขึ้นไป */}
        <div className="hidden sm:block">
          <TourAsia
            sectionName="Tour Asia"
            tours={tourAsiaData} // ส่งข้อมูลที่เกี่ยวข้องกับ TourAsia
          />
        </div>
      </section>

      {/* Transfer Section */}
      <section
        className="flex-1 bg-center bg-cover shadow-inner shadow-black"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(240, 240, 240, 0.7), rgba(255, 255, 255, 0.5)), url('/images/TourMonth&Sightseeing/BGtour.jpg')",
        }}
      >
        <div className="py-1 mx-auto text-white">
          <Transfer />
        </div>
      </section>
    </div>
  );
};

export default Home;
