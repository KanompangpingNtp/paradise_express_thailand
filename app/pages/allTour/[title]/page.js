"use client";
import { useState, useEffect, useCallback } from "react"; // นำ useCallback เข้ามาใช้งาน
import SearchBar from "@/app/components/SearchBar";
import TourCard from "@/app/components/TourCard";
import Top from "@/app/components/top";
import { useParams } from "next/navigation";

const cardDataTourMonth = [
  {
    image: "/images/03.jpg",
    title: "Grand Palace & Emerald Buddha Temple",
    description:
      "This trip is a gentle way to see Chiang Mai before breakfast.",
    items: [
      "Temple tour",
      "Photography spots",
      "Temple tour",
      "Photography spots",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "Boat ride",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "Boat ride",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "Boat ride",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "Boat ride",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "Boat ride",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "Boat ride",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "Boat ride",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
];

const cardDataSightseeing = [
  {
    image: "/images/03.jpg",
    title: "Grand Palace & Emerald Buddha Temple",
    description:
      "This trip is a gentle way to see Chiang Mai before breakfast.",
    items: [
      "SightSeeing",
      "Photography spots",
      "Temple tour",
      "Photography spots",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "SightSeeing",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "SightSeeing",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "SightSeeing",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour SightSeeing",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "SightSeeing",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "SightSeeing",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "SightSeeing Long-tail Boat Tour",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "SightSeeing",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
  {
    image: "/images/03.jpg",
    title: "Long-tail Boat Tour SightSeeing",
    description:
      "Explore the local canals and waterways of Chiang Mai.  and waterways of Chiang Mai",
    items: [
      "SightSeeing",
      "Local market visit",
      "Traditional food",
      "Scenic views",
      "Scenic views",
    ],
  },
];

function AllTourMonth() {
  const { title } = useParams(); // รับค่า title จาก URL
  const [searchQuery, setSearchQuery] = useState(""); // เก็บค่าคำค้นหา
  const [filteredData, setFilteredData] = useState([]); // ข้อมูลที่กรองแล้ว

  // ฟังก์ชันที่ใช้เลือกข้อมูลตาม title
  const getCardData = useCallback(() => {
    if (title === "TourSightseeing") {
      return cardDataSightseeing; // ใช้ cardDataSightseeing
    } else if (title === "TourMonth") {
      return cardDataTourMonth; // ใช้ cardDataTourMonth
    } else {
      return []; // ถ้าไม่มี title ตรง
    }
  }, [title]); // ใช้ title เป็น dependency

  // ฟังก์ชันกรองข้อมูลตามคำค้นหา
  const handleSearch = (query) => {
    setSearchQuery(query);
    const cardData = getCardData();
    if (query === "") {
      setFilteredData(cardData); // ถ้าไม่มีการค้นหา ให้แสดงข้อมูลทั้งหมด
    } else {
      const filtered = cardData.filter(
        (card) =>
          card.title.toLowerCase().includes(query.toLowerCase()) ||
          card.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered); // แสดงข้อมูลที่กรองแล้ว
    }
  };

  // เมื่อ title เปลี่ยนแปลง ก็จะทำการกรองข้อมูลใหม่
  useEffect(() => {
    const cardData = getCardData();
    setFilteredData(cardData); // กำหนดข้อมูลเริ่มต้นให้แสดงทั้งหมด
  }, [getCardData]); // เพิ่ม getCardData เป็น dependency

  return (
    <div>
      <Top title={title} />
      <div className="w-full bg-white py-12">
        <div className="container mx-auto">
          <SearchBar onSearch={handleSearch} />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* วนลูปแสดง TourCard */}
            {filteredData.map((card, index) => (
              <TourCard key={index} card={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTourMonth;
