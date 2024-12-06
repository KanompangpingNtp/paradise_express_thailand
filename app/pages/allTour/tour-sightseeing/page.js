"use client";
import { useState, useEffect } from "react";

import TourCard from "@/app/components/TourCard";
import SearchBar from "@/app/components/SearchBar";
import Top from "@/app/components/top";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // นำเข้าไอคอนค้นหาจาก Heroicons
import LoadingFornt from "@/app/components/LoadingFornt";

// ฟังก์ชันที่ทำการ fetch ข้อมูลจาก API
async function getToursData() {
  const response = await fetch("http://localhost:3000/api/tours/tours_data");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  // กรองข้อมูลที่มี section_name เป็น "Tour Month"
  const filteredTours = data.tours.filter(tour => tour.section_name === "Sightseeing");

  return filteredTours; // ส่งกลับเฉพาะข้อมูลที่ตรงเงื่อนไข
}

const TourSightseeing = () => {
  const [tourData, setTourData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ดึงข้อมูลจาก API เมื่อ component โหลดครั้งแรก
  useEffect(() => {
    async function fetchTours() {
      try {
        const tours = await getToursData();
        setTourData(tours);
        setFilteredData(tours); // ตั้งค่าเริ่มต้นสำหรับข้อมูลที่จะแสดง
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTours();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

    const filtered = tourData.filter((card) => {
      const name = card.name ? card.name.toLowerCase().trim() : "";
      const detail = card.detail ? card.detail.toLowerCase().trim() : "";
      const highlights = card.highlights ? card.highlights.map(h => h.toLowerCase().trim()) : [];

      return (
        name.includes(query.toLowerCase().trim()) ||
        detail.includes(query.toLowerCase().trim()) ||
        highlights.some(highlight => highlight.includes(query.toLowerCase().trim()))
      );
    });

    setFilteredData(filtered);
  };

  // ตรวจสอบว่า tourData มีข้อมูลหรือไม่ แล้วดึงค่า section_name จาก tourData[0]
  const sectionName = tourData.length > 0 ? tourData[0].section_name : "All Tours";

  return (
    <div>
      <Top title={sectionName} />
      <div className="w-full bg-white py-12">
        <div className="container mx-auto">
          {loading ? (
            <LoadingFornt/>
          ) : error ? (
            <div className="text-center text-red-500">
              <p className="text-xl font-semibold">Error: {error}</p>
            </div>
          ) : (
            <>
              <SearchBar query={searchQuery} onSearch={handleSearch} />
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredData.length > 0 ? (
                  filteredData.map((card, index) => (
                    <TourCard key={index} card={card} />
                  ))
                ) : (
                  <div className="flex items-center justify-center w-full h-64 bg-gray-100 rounded-lg shadow-md mt-8">
                    <div className="text-center">
                      <MagnifyingGlassIcon className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                      <p className="text-xl font-semibold text-gray-600">No tours found</p>
                      <p className="text-gray-500 mt-2">Try adjusting your search criteria or check back later.</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourSightseeing;
