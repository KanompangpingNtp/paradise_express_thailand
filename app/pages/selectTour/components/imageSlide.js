import React, { useState } from "react";
import Link from "next/link"; // นำเข้า Link จาก next/link
import Image from "next/image"; // นำเข้า Image จาก next/image

const images = [
  "/images/bgmenu.jpg",
  "/images/footer.jpg",
  "/images/yuk.jpg",
  "/images/03.jpg",
  "/images/46.jpg",
];

function ImageSlide() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setModalOpen(true);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const visibleImages = images.slice(0, 3);

  const openViewMore = () => {
    setModalOpen(true);
    setCurrentIndex(2);
  };

  return (
    <div className="flex">
      <div className="flex-none w-1/2">
        <Image
          src={visibleImages[0]}
          alt="Image 1"
          className="w-full cursor-pointer"
          width={600} // กำหนดขนาดของรูป
          height={400} // กำหนดขนาดของรูป
          onClick={() => openModal(0)}
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex">
          <Image
            src={visibleImages[1]}
            alt="Image 2"
            className="w-1/2 cursor-pointer"
            width={600} // กำหนดขนาดของรูป
            height={400} // กำหนดขนาดของรูป
            onClick={() => openModal(1)}
          />
          <div className="relative w-1/2">
            <Image
              src={visibleImages[2]}
              alt="Image 3"
              className="w-full cursor-pointer"
              width={600} // กำหนดขนาดของรูป
              height={400} // กำหนดขนาดของรูป
              onClick={() => openModal(2)}
            />
            {images.length > 3 && (
              <div
                className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl cursor-pointer"
                onClick={openViewMore}
              >
                View More
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal - Fullscreen */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          {/* Close button and logo */}
          <div className="absolute top-5 left-5 flex items-center space-x-2">
            {/* Close button */}
            <button
              className="text-red-600 text-4xl py-3 px-6 bg-black rounded-full hover:bg-gray-900 z-50"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* Logo image on the right of the close button */}
            <Link href="/" passHref className="flex items-center">
              <Image
                src="/images/logo_edited.avif" // เปลี่ยนเป็น path ของโลโก้
                alt="Logo"
                className="w-12 h-12 object-cover"
                width={48} // กำหนดขนาดของโลโก้
                height={48} // กำหนดขนาดของโลโก้
              />
            </Link>
          </div>

          <div className="flex items-center w-full h-full">
            {/* Left background section */}
            <div
              className="bg-black w-40 h-full flex items-center justify-center"
              onClick={closeModal}
            >
              {/* Left arrow button */}
              <button
                className="text-white text-4xl py-3 px-7 bg-gray-800 rounded-full hover:bg-gray-600"
                onClick={(e) => {
                  e.stopPropagation(); // ป้องกันการปิด Modal เมื่อคลิกปุ่ม
                  prevImage();
                }}
              >
                &#8249;
              </button>
            </div>

            {/* Image */}
            <div className="flex-1 flex justify-center items-center bg-black h-full relative">
              <Image
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                className="object-contain"
                layout="fill" // ใช้ layout="fill" เพื่อให้รูปขยายเต็มที่ใน div
                objectFit="contain" // ให้รูปขยายเต็มที่โดยรักษาสัดส่วน
              />
            </div>

            {/* Right background section */}
            <div
              className="bg-black w-40 h-full flex items-center justify-center"
              onClick={closeModal}
            >
              {/* Right arrow button */}
              <button
                className="text-white text-4xl py-3 px-7 bg-gray-800 rounded-full hover:bg-gray-600"
                onClick={(e) => {
                  e.stopPropagation(); // ป้องกันการปิด Modal เมื่อคลิกปุ่ม
                  nextImage();
                }}
              >
                &#8250;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageSlide;
