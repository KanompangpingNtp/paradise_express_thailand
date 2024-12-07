"use client";  // สำหรับการใช้งาน React Client Component

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { PlusCircleIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Loading from "@/app/components/Loading"; // โหลดส่วนการโหลด
import { useRouter } from "next/navigation";

const CarBrands = () => {
  const [carBrands, setCarBrands] = useState([]);  // สถานะของ carBrands
  const [loading, setLoading] = useState(true);  // สถานะการโหลดข้อมูล
  const [error, setError] = useState(null);  // สถานะข้อผิดพลาด
  const router = useRouter(); // เรียก useRouter ที่นี่

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

  // ฟังก์ชันสร้าง car brand ใหม่
  const handleCreateCarBrand = async () => {
    const { value: carBrandName } = await Swal.fire({
      title: "Create New Car Brand",
      input: "text",
      inputLabel: "Enter Car Brand Name",
      showCancelButton: true,
      confirmButtonText: "Create",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value.trim()) {
          return "Car brand name cannot be empty!";
        }
      },
    });

    if (carBrandName) {
      setLoading(true);  // ตั้งสถานะโหลด
      try {
        const response = await fetch("/api/car/car_brand", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ car_brand_name: carBrandName }),
        });

        const data = await response.json();

        if (response.ok) {
          Swal.fire("Success", "Car brand created successfully!", "success");
          setCarBrands((prevBrands) => [
            ...prevBrands,
            { id: data.id, car_brand_name: carBrandName },
          ]);  // เพิ่ม car brand ใหม่ในลิสต์
        } else {
          Swal.fire("Error", data.error || "Failed to create car brand", "error");
        }
      } catch (err) {
        Swal.fire("Error", "An error occurred. Please try again.", "error");
      } finally {
        setLoading(false);  // หยุดสถานะโหลด
      }
    }
  };

  // ฟังก์ชันแก้ไข car brand
  const handleEditCarBrand = async (carBrand) => {
    const { value: updatedBrandName } = await Swal.fire({
      title: `Edit Car Brand: ${carBrand.car_brand_name}`,
      input: "text",
      inputLabel: "Edit Car Brand Name",
      inputValue: carBrand.car_brand_name,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value.trim()) {
          return "Car brand name cannot be empty!";
        }
      },
    });

    if (updatedBrandName && updatedBrandName !== carBrand.car_brand_name) {
      setLoading(true);  // ตั้งสถานะโหลด
      try {
        const response = await fetch(`/api/car/car_brand/${carBrand.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ car_brand_name: updatedBrandName }),
        });

        const data = await response.json();

        if (response.ok) {
          Swal.fire("Success", "Car brand updated successfully!", "success");
          setCarBrands((prevBrands) =>
            prevBrands.map((brand) =>
              brand.id === carBrand.id ? { ...brand, car_brand_name: updatedBrandName } : brand
            )
          );
        } else {
          Swal.fire("Error", data.error || "Failed to update car brand", "error");
        }
      } catch (err) {
        Swal.fire("Error", "An error occurred. Please try again.", "error");
      } finally {
        setLoading(false);  // หยุดสถานะโหลด
      }
    }
  };

  // ฟังก์ชันลบ car brand
  const handleDeleteCarBrand = async (carBrand) => {
    const confirmed = await Swal.fire({
      title: `Are you sure you want to delete ${carBrand.car_brand_name}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it",
      cancelButtonText: "Cancel",
    });

    if (confirmed.isConfirmed) {
      setLoading(true);  // ตั้งสถานะโหลด
      try {
        const response = await fetch(`/api/car/car_brand/${carBrand.id}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (response.ok) {
          Swal.fire("Deleted", "Car brand deleted successfully!", "success");
          setCarBrands((prevBrands) =>
            prevBrands.filter((brand) => brand.id !== carBrand.id)
          );
        } else {
          Swal.fire("Error", data.error || "Failed to delete car brand", "error");
        }
      } catch (err) {
        Swal.fire("Error", "An error occurred. Please try again.", "error");
      } finally {
        setLoading(false);  // หยุดสถานะโหลด
      }
    }
  };

  const handleViewRoutes = (carBrandId) => {
    if (carBrandId) {
      router.push(`/Dashboard/transfer/car/car_model/${carBrandId}`);
    } else {
      Swal.fire("Error", "carBrand id is missing", "error");
    }
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
          onClick={handleCreateCarBrand}  // เมื่อคลิกปุ่มจะสร้าง car brand ใหม่
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

                {/* ปุ่ม Edit */}
                <button
                  onClick={() => handleEditCarBrand(carBrand)}  // เมื่อคลิกจะทำการแก้ไข car brand
                  className="bg-yellow-400 text-white px-3 py-2 rounded-md hover:bg-yellow-500 flex items-center duration-300"
                >
                  <PencilSquareIcon className="w-5 h-5 mr-2" />
                  Edit
                </button>
                {/* ปุ่ม Delete */}
                <button
                  onClick={() => handleDeleteCarBrand(carBrand)}  // เมื่อคลิกจะทำการลบ car brand
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 flex items-center duration-300"
                >
                  <TrashIcon className="w-5 h-5 mr-2" />
                  Delete
                </button>
                {/* ปุ่มดูรายละเอียด */}
                <button
                onClick={() => handleViewRoutes(carBrand.id)}
                className="bg-sky-400 text-white px-3 py-2 rounded-md hover:bg-sky-500 flex items-center duration-300"
              >
                View
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
