// components/CarCard.js
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const CarCard = ({ car }) => {

  // แยกรูปภาพจาก car_images_files โดยใช้รูปแรก
  const carImages = car.car_images_files.split(",");
  const primaryImage = carImages[0] || "default-image.jpg"; // ใช้รูปแรกหรือลงรูปดีฟอลต์

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:bg-gray-100 hover:shadow-md hover:shadow-yellow-500 transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-48">
        <Image
          src={`/uploads/${primaryImage}`} // ใช้เส้นทางในโฟลเดอร์ public
          alt={car.car_model_name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg text-black font-bold mb-2">{car.car_brand_name} {car.car_model_name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{car.route_detail_name}</p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-black text-md font-bold underline decoration-2 decoration-gray-300">
            Price: {car.data_price} THB
          </span>
          <Link
            href={{
              pathname: `/pages/allTransfer/detailCar`, // ใช้ title หรือ ID ของ car
              query: { car: JSON.stringify(car) }, // ส่งข้อมูล car ผ่าน query string
            }}
            className="text-orange-500 text-md font-bold underline decoration-2 decoration-orange-500"
          >
            View more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
