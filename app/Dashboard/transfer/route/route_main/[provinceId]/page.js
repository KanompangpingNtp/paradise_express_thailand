"use client";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { useParams } from "next/navigation"; // ใช้ useParams เพื่อดึงค่าจาก params
import Loading from "@/app/components/Loading"; // โหลดส่วนการโหลด
import {
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const RouteMain = () => {
  const { provinceId } = useParams(); // ดึงค่าจาก params
  const decodedProvinceId = decodeURIComponent(provinceId); // decode ค่า provinceId
  const [routes, setRoutes] = useState([]); // สำหรับเก็บข้อมูลเส้นทาง
  const [loading, setLoading] = useState(true); // ใช้สำหรับจัดการสถานะการโหลดข้อมูล
  const [error, setError] = useState(null); // ใช้สำหรับจัดการข้อผิดพลาด
  const router = useRouter(); // เรียก useRouter ที่นี่

  // ฟังก์ชันดึงข้อมูลเส้นทางใหม่จาก API โดยใช้ useCallback เพื่อให้ฟังก์ชัน memoize
  const fetchRoutes = useCallback(async () => {
    try {
      const response = await fetch("/api/route/manage_routes");
      const data = await response.json();
      if (response.ok) {
        // กรองข้อมูลที่ province_id ตรงกับ decodedProvinceId
        const filteredRoutes = data.routes.filter(
          (route) => route.province_id === parseInt(decodedProvinceId)
        );
        setRoutes(filteredRoutes); // เก็บข้อมูลที่กรองแล้ว
      } else {
        throw new Error(data.error || "Failed to fetch routes");
      }
    } catch (err) {
      setError(err.message); // เก็บข้อผิดพลาด
    } finally {
      setLoading(false); // ปิดสถานะการโหลด
    }
  }, [decodedProvinceId]); // ใช้ decodedProvinceId เป็น dependency

  // ดึงข้อมูลเมื่อ component mount หรือ provinceId เปลี่ยน
  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]); // ใช้ fetchRoutes ใน dependency array

  // ฟังก์ชันสร้าง Route ใหม่
  const handleCreateRoute = async () => {
    const { value: routeName } = await Swal.fire({
      title: "Create New Route Main",
      input: "text",
      inputLabel: "Enter Route Name",
      showCancelButton: true,
      confirmButtonText: "Create",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value.trim()) {
          return "Route name cannot be empty!";
        }
      },
    });

    if (routeName) {
      try {
        const response = await fetch("/api/route/manage_routes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            route_name: routeName,
            province_id: decodedProvinceId,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          Swal.fire("Success", data.message, "success");
          // ดึงข้อมูลใหม่หลังการสร้างเส้นทาง
          fetchRoutes();
        } else {
          throw new Error(data.error || "Failed to create route");
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  // ฟังก์ชันแก้ไข Route
  const handleEditRoute = async (routeId, routeName, provinceId) => {
    const { value: updatedRouteName } = await Swal.fire({
      title: "Edit Route Name",
      input: "text",
      inputLabel: "Enter new route name",
      inputValue: routeName, // ใช้ชื่อเส้นทางเดิมเป็นค่าเริ่มต้น
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value.trim()) {
          return "Route name cannot be empty!";
        }
      },
    });

    if (updatedRouteName) {
      try {
        const response = await fetch(`/api/route/manage_routes/${routeId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            route_id: routeId,
            route_name: updatedRouteName,
            province_id: provinceId,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          Swal.fire("Success", data.message, "success");
          // รีเฟรชข้อมูลใหม่หลังจากแก้ไข
          fetchRoutes();
        } else {
          Swal.fire("Error", data.error, "error");
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  // ฟังก์ชันลบ Route
  const handleDeleteRoute = async (routeId) => {
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
        const response = await fetch(`/api/route/manage_routes/${routeId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ route_id: routeId }),
        });
        const data = await response.json();
        if (response.ok) {
          Swal.fire("Deleted!", data.message, "success");
          // รีเฟรชข้อมูลใหม่หลังจากลบ
          fetchRoutes();
        } else {
          Swal.fire("Error", data.error, "error");
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  const handleViewRoutes = (routeId) => {
    if (routeId) {
      router.push(`/Dashboard/transfer/route/route_detail/${routeId}`);
    } else {
      Swal.fire("Error", "Province id is missing", "error");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="text-3xl text-center font-bold text-sky-600 mb-6">
        Routes Main Management
      </div>

      {/* ปุ่มสร้าง Route ใหม่ */}
      <div className="w-full flex justify-center lg:justify-end my-6">
        <button
          onClick={handleCreateRoute}
          className="w-full lg:w-auto bg-sky-500 text-white px-6 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-sky-600 transition-all duration-300"
        >
          <PlusCircleIcon className="w-6 h-6" />
          <span className="text-lg font-medium">Create New Route</span>
        </button>
      </div>

      {/* แสดงข้อมูลเส้นทางในรูปแบบการ์ด */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {routes.length === 0 ? (
          <p className="text-center text-gray-500">
            No routes found for this province.
          </p>
        ) : (
          routes.map((route) => (
            <div
              key={route.route_id}
              className="bg-white rounded-lg shadow-lg p-6 border border-blue-200 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl text-sky-600">
                  {route.route_name}
                </h3>
                <span className="text-sm text-gray-500">
                  Route ID: {route.route_id}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  Province: {route.province_name}
                </span>
                <div className="flex space-x-2">
                  {/* ปุ่มแก้ไข */}
                  <button
                    onClick={() =>
                      handleEditRoute(
                        route.route_id,
                        route.route_name,
                        route.province_id
                      )
                    }
                    className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 duration-300"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  {/* ปุ่มลบ */}
                  <button
                    onClick={() => handleDeleteRoute(route.route_id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 duration-300"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleViewRoutes(route.route_id)}
                    className="bg-sky-400 text-white px-3 py-2 rounded-md hover:bg-sky-500 flex items-center duration-300"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RouteMain;
