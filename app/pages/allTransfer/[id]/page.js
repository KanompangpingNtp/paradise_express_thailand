"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ใช้ useParams แทน useRouter
import LoadingFornt from "@/app/components/LoadingFornt";
import CarCard from "@/app/components/CarCard"; // นำเข้า CarCard component
import Top from "@/app/components/top";
import SearchBar from "@/app/components/SearchBar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function NextPage() {
  const { id } = useParams(); // ดึงค่าจาก URL path parameter โดยตรง
  const [routeData, setRouteData] = useState([]); // สำหรับเก็บข้อมูลที่กรองแล้ว
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // ค่าของคำค้นหาจาก SearchBar
  const [filteredData, setFilteredData] = useState([]); // เก็บข้อมูลที่ผ่านการกรองแล้ว

  useEffect(() => {
    if (!id) {
      console.error("ID is not available in the URL");
      setLoading(false); // ทำให้ไม่เกิดการโหลดข้อมูลหากไม่พบ ID
      return;
    }

    console.log(id);

    // ดึงข้อมูลจาก API ที่กรองโดยตรงตาม route_total_id
    const fetchRouteData = async () => {
      try {
        // ส่ง id ไปใน query params เพื่อลงกรองข้อมูลจาก API
        const response = await fetch(`/api/route/route_total/select?id=${id}`);
        const data = await response.json();

        console.log("Filtered Route Data: ", data); // Debug: แสดงข้อมูลที่กรองแล้วจาก API

        setRouteData(data.routeData || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching route data:", error);
        setLoading(false);
      }
    };

    fetchRouteData();
  }, [id]); // เมื่อ id เปลี่ยนให้โหลดข้อมูลใหม่

  // ฟังก์ชันกรองข้อมูลตามคำค้นหา
  useEffect(() => {
    if (searchQuery) {
      const result = routeData.filter((route) =>
        route.car_brand_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.car_model_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(result);
    } else {
      setFilteredData(routeData); // หากไม่มีคำค้นหาก็แสดงข้อมูลทั้งหมด
    }
  }, [searchQuery, routeData]); // เมื่อ searchQuery หรือ routeData เปลี่ยนให้ทำการกรองข้อมูลใหม่

  // ถ้ายังไม่โหลดข้อมูล
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingFornt />
      </div>
    );
  }

  // ถ้าไม่พบข้อมูลที่ตรงกับ id
  if (routeData.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">
          No data found for the selected route.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Top title="List Car" />
      <div className="w-full bg-white py-12">
        <div className="container mx-auto">
          <SearchBar query={searchQuery} onSearch={setSearchQuery} />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredData.length > 0 ? (
              filteredData.map((route, index) => (
                <CarCard key={route.route_total_id} car={route} />
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-64 bg-gray-100 rounded-lg shadow-md mt-8">
                <div className="text-center">
                  <MagnifyingGlassIcon className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                  <p className="text-xl font-semibold text-gray-600">No cars found</p>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your search criteria or check back later.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NextPage;
