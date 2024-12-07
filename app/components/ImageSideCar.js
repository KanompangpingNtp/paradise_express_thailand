import { useState } from "react";  // เพิ่มบรรทัดนี้

const ImageSlideCar = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ตรวจสอบว่า images เป็นอาเรย์หรือไม่
  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden rounded-lg shadow-lg">
      {/* Single Image */}
      <div className="relative w-full h-[60vh]">
        <img
          src={`/uploads/${images[currentIndex].file}`} // แสดงภาพทีละภาพ
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"
      >
        &#10095;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-orange-500" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlideCar