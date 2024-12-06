"use client";  // สำหรับการใช้งาน React Client Component

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { PlusCircleIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Loading from "@/app/components/Loading"; // โหลดส่วนการโหลด

const CarBrands = () => {
  const [carBrands, setCarBrands] = useState([]);  // สถานะของ carBrands
  const [loading, setLoading] = useState(true);  // สถานะการโหลดข้อมูล
  const [error, setError] = useState(null);  // สถานะข้อผิดพลาด

  // ดึงข้อมูลจาก API
  useEffect(() => {
    const fetchCarBrands = async () => {
      try {
        const response = await fetch("/api/car/car_brand");
        const data = await response.json();

        if (response.ok) {
          setCarBrands(data);  // ตั้งค่าผลลัพธ์ที่ได้รับจาก API
        } else {
          throw new Error(data.error || "Failed to fetch car brands");
        }
      } catch (err) {
        setError(err.message);  // เก็บข้อผิดพลาด
      } finally {
        setLoading(false);  // หยุดสถานะการโหลด
      }
    };

    fetchCarBrands();
  }, []);

  // ฟังก์ชันที่จะแสดงข้อมูล car brand
  const handleViewDetails = (carBrandId) => {
    Swal.fire({
      title: `Car Brand ID: ${carBrandId}`,
      text: `Here you can display more details for Car Brand ID: ${carBrandId}`,
      icon: "info",
    });
  };

  return (
    <div className="container mx-auto p-6">
      {loading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}  {/* แสดงข้อผิดพลาด */}

      <div className="text-3xl text-center font-bold text-sky-600 mb-6">
        Car Brands Management
      </div>

      {/* ปุ่มสร้าง car brand ใหม่ */}
      <div className="w-full flex justify-center lg:justify-end my-6">
        <button
          className="w-full lg:w-auto bg-sky-400 text-white px-6 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-sky-600 transition-all duration-300"
        >
          <PlusCircleIcon className="w-6 h-6" />
          <span className="text-lg font-medium">Create New Car Brand</span>
        </button>
      </div>

      {/* แสดงรายชื่อ car brands */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {carBrands.length > 0 ? (
          carBrands.map((carBrand) => (
            <div
              key={carBrand.id}
              className="bg-white rounded-lg shadow-md p-4 border border-blue-200 hover:shadow-md hover:shadow-sky-400 duration-300"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-sky-600">
                  {carBrand.car_brand_name}
                </h3>
                <span className="text-sm text-gray-500">ID: {carBrand.id}</span>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                {/* ปุ่มดูรายละเอียด */}
                <button
                  onClick={() => handleViewDetails(carBrand.id)}
                  className="bg-sky-400 text-white px-3 py-2 rounded-md hover:bg-sky-500 flex items-center duration-300"
                >
                  View Details
                </button>
                {/* ปุ่ม Edit */}
                <button
                  className="bg-yellow-400 text-white px-3 py-2 rounded-md hover:bg-yellow-500 flex items-center duration-300"
                >
                  <PencilSquareIcon className="w-5 h-5 mr-2" />
                  Edit
                </button>
                {/* ปุ่ม Delete */}
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 flex items-center duration-300"
                >
                  <TrashIcon className="w-5 h-5 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No car brands found</p>
        )}
      </div>
    </div>
  );
};

export default CarBrands;
