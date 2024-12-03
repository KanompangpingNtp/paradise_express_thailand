// components/TourCard.js
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const TourCard = ({ card }) => {
  const maxVisibleItems = 3; // จำนวนรายการที่จะแสดงในกรณีที่รายการเยอะเกิน

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:bg-gray-100 hover:shadow-md hover:shadow-yellow-500 transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-48">
        <Image
          src={card.image}
          alt={card.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg text-black font-bold mb-2">{card.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{card.description}</p>

        <div className="flex justify-between items-center">
          <span className="text-black text-md font-bold underline decoration-2 decoration-gray-300">
            HIGHLIGHT
          </span>
          <Link
            href={{
              pathname: `/pages/detailTour/${card.title}`, // ใช้ title หรือ ID ของ card
              query: { card: JSON.stringify(card) }, // ส่งข้อมูล card ผ่าน query string
            }}
            className="text-orange-500 text-md font-bold underline decoration-2 decoration-orange-500"
          >
            View more
          </Link>
        </div>

        {/* Highlight Items */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 max-h-[8rem] overflow-hidden">
          {card.items.slice(0, maxVisibleItems).map((item, itemIndex) => (
            <div key={itemIndex} className="flex items-center text-black text-sm font-bold">
              <CheckCircleIcon className="w-6 h-6 text-orange-500 mr-1" />
              <span className="truncate max-w-[20ch]">{item}</span>
            </div>
          ))}
          {/* Show "More Items" if applicable */}
          {card.items.length > maxVisibleItems && (
            <div className="flex items-center text-black text-sm font-bold">
              <CheckCircleIcon className="w-6 h-6 text-orange-500 mr-1" />
              <span className="truncate max-w-[20ch]">Many more</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourCard;
