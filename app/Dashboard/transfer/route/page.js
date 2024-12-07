"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading"; // โหลดส่วนการโหลด

const ProvinceManagement = () => {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // เรียก useRouter ที่นี่


  // ดึงข้อมูลจาก API
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("/api/route/province");
        const data = await response.json();
        if (response.ok) {
          setProvinces(data); // ตั้งค่าผลลัพธ์ที่ได้รับจาก API
        } else {
          throw new Error(data.error || "Failed to fetch provinces");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProvinces();
  }, []);

  // ฟังก์ชันสร้างจังหวัดใหม่
  const handleCreateProvince = async () => {
    const { value: provinceName } = await Swal.fire({
      title: "Create New Province",
      input: "text",
      inputLabel: "Enter Province Name",
      showCancelButton: true,
      confirmButtonText: "Create",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value.trim()) {
          return "Province name cannot be empty!";
        }
      },
    });

    if (provinceName) {
      try {
        const response = await fetch("/api/route/province", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ province_name: provinceName }),
        });
        const data = await response.json();
        if (response.ok) {
          Swal.fire("Success", data.message, "success");
          setProvinces((prev) => [
            ...prev,
            { id: data.id, province_name: provinceName },
          ]); // เพิ่มจังหวัดใหม่ใน list
        } else {
          throw new Error(data.error || "Failed to create province");
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  const handleEditProvince = async (id, currentName) => {
    const { value: provinceName } = await Swal.fire({
      title: "Edit Province",
      input: "text",
      inputLabel: "Enter New Province Name",
      inputValue: currentName,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value.trim()) {
          return "Province name cannot be empty!";
        }
      },
    });

    if (provinceName) {
      try {
        const response = await fetch(`/api/route/province/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ province_name: provinceName }),
        });

        const data = await response.json();
        if (response.ok) {
          Swal.fire("Success", "Province updated successfully", "success");
          setProvinces((prev) =>
            prev.map((province) =>
              province.id === id
                ? { ...province, province_name: provinceName }
                : province
            )
          );
        } else {
          throw new Error(data.error || "Failed to update province");
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  // ฟังก์ชันลบจังหวัด
  const handleDeleteProvince = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/route/province/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.ok) {
          Swal.fire("Deleted!", "Province has been deleted.", "success");
          setProvinces((prev) => prev.filter((province) => province.id !== id)); // ลบจังหวัดออกจาก list
        } else {
          throw new Error(data.error || "Failed to delete province");
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  const handleViewRoutes = (provinceId) => {
    if (provinceId) {
      router.push(`/Dashboard/transfer/route/route_main/${provinceId}`);
    } else {
      Swal.fire("Error", "Province id is missing", "error");
    }
  };

  return (
    <div className="container mx-auto p-6">
      {loading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}

      <div className="text-3xl text-center font-bold text-sky-600 mb-6">
        Province Management
      </div>

      {/* ปุ่มสร้างจังหวัดใหม่ */}
      <div className="w-full flex justify-center lg:justify-end my-6">
        <button
          onClick={handleCreateProvince}
          className="w-full lg:w-auto bg-sky-400 text-white px-6 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-sky-600 transition-all duration-300"
        >
          <PlusCircleIcon className="w-6 h-6" />
          <span className="text-lg font-medium">Create New Province</span>
        </button>
      </div>

      {/* แสดงรายชื่อจังหวัด */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {provinces.map((province) => (
          <div
            key={province.id}
            className="bg-white rounded-lg shadow-md p-4 border border-blue-200 hover:shadow-md hover:shadow-sky-400 duration-300"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-sky-600">
                {province.province_name}
              </h3>
              <span className="text-sm text-gray-500">ID: {province.id}</span>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              {/* ปุ่ม Edit, Delete */}
              <button
                onClick={() =>
                  handleEditProvince(province.id, province.province_name)
                }
                className="bg-yellow-400 text-white px-3 py-2 rounded-md hover:bg-yellow-500 flex items-center duration-300"
              >
                <PencilSquareIcon className="w-5 h-5 mr-2" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteProvince(province.id)}
                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 flex items-center duration-300"
              >
                <TrashIcon className="w-5 h-5 mr-2" />
                Delete
              </button>
              <button
                onClick={() => handleViewRoutes(province.id)}
                className="bg-sky-400 text-white px-3 py-2 rounded-md hover:bg-sky-500 flex items-center duration-300"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProvinceManagement;
