
"use client"
import ImageSlide from "./components/imageSlide";
function SelectTour() {
  return (
    <div
      className="w-full h-auto bg-center bg-cover flex justify-center py-10"
      style={{
        backgroundImage: "url('/images/HeroSection/toppic.png')",
      }}
    >
      {/* Content Section */}
      <div className="container bg-white p-5 rounded-lg shadow-lg my-20 mx-5 border-4">
        <h1 className="text-2xl text-center font-bold mb-4">Title SelectTour</h1>
        <ImageSlide/>
      </div>
    </div>
  );
}

export default SelectTour;
