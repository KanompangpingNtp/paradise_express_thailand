"use client";

import { useEffect, useState } from "react";
import {
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"; // นำเข้าไอคอนที่จำเป็น
import { useParams } from "next/navigation";
import Loading from "@/app/components/Loading";
import Swal from "sweetalert2";

export default function ShowRouteDetails() {
  const [routes, setRoutes] = useState([]);
  const [routesDetail, setRoutesDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const { routeId } = useParams(); // ดึงค่า routeId จาก params
  const [searchTerm, setSearchTerm] = useState("");

  // ฟังก์ชันในการดึงข้อมูลจาก API
  const fetchRoutes = async () => {
    try {
      const res = await fetch("/api/route/manage_routes_detail");
      const data = await res.json();

      if (data.routes && data.routes_detail) {
        setRoutes(data.routes);
        setRoutesDetail(data.routes_detail);
      } else {
        console.error("Failed to fetch routes:", data.message);
      }
    } catch (error) {
      console.error("Error fetching routes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  // ฟังก์ชันสำหรับสร้าง route_detail
  async function createRouteDetail(routeId) {
    const { value: routeDetailName } = await Swal.fire({
      title: "Create New Route Detail",
      input: "text",
      inputLabel: "Route Detail Name",
      inputPlaceholder: "Enter the name of the route detail",
      showCancelButton: true,
      confirmButtonText: "Create",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "Please enter a route detail name!";
        }
      },
    });

    if (routeDetailName) {
      try {
        const response = await fetch("/api/route/manage_routes_detail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            route_id: routeId,
            route_detail_name: routeDetailName,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          Swal.fire({
            title: "Success!",
            text: data.message,
            icon: "success",
            confirmButtonText: "OK",
          });
          fetchRoutes();
          // Refresh data or perform necessary actions
        } else {
          Swal.fire({
            title: "Error",
            text: data.error || "Failed to create route detail.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.error("Error creating route detail:", error);
        Swal.fire({
          title: "Error",
          text: "An unexpected error occurred.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  }

  async function deleteRouteDetail(routeDetailId) {
    if (!routeDetailId) {
      Swal.fire("Error", "Route detail ID is required.", "error");
      return;
    }

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
        const response = await fetch(
          `/api/route/manage_routes_detail/${routeDetailId}`,
          {
            method: "DELETE",
          }
        );

        const data = await response.json();

        if (response.ok) {
          Swal.fire("Deleted!", data.message, "success");
          fetchRoutes(); // Refresh data
        } else {
          Swal.fire(
            "Error!",
            data.error || "Failed to delete route detail.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error deleting route detail:", error);
        Swal.fire("Error!", "An unexpected error occurred.", "error");
      }
    }
  }

  async function editRouteDetail(routeDetailId, currentName) {
    if (!routeDetailId || !currentName) {
      Swal.fire("Error", "Route detail ID and name are required.", "error");
      return;
    }

    const { value: newRouteDetailName } = await Swal.fire({
      title: "Edit Route Detail",
      input: "text",
      inputLabel: "Route Detail Name",
      inputPlaceholder: "Enter the new route detail name",
      inputValue: currentName,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "Please enter a route detail name!";
        }
      },
    });

    if (newRouteDetailName) {
      try {
        const response = await fetch(
          `/api/route/manage_routes_detail/${routeDetailId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              route_detail_name: newRouteDetailName,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          Swal.fire("Success!", data.message, "success");
          fetchRoutes(); // Refresh data
        } else {
          Swal.fire(
            "Error!",
            data.error || "Failed to edit route detail.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error editing route detail:", error);
        Swal.fire("Error!", "An unexpected error occurred.", "error");
      }
    }
  }

  if (loading) return <Loading />;

  // หาชื่อ route_name ที่ตรงกับ routeId
  const route = routes.find((route) => route.route_id === Number(routeId));
  const routeName = route?.route_name || "";

  // กรองข้อมูล routesDetail โดยเทียบ route_name
  const filteredRoutesDetail = routesDetail.filter(
    (detail) => detail.route_name === routeName
  );

  // กรองข้อมูลตามคำค้นหา
  const searchedRoutesDetail = filteredRoutesDetail.filter((detail) =>
    detail.route_detail_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* แสดงหัวข้อ */}
      <div className="text-3xl text-center font-bold text-sky-600 flex items-center justify-center mb-10">
        <ClipboardDocumentListIcon className="w-8 h-8 mr-2" />
        Route Details for {routeName}
      </div>

      {/* ช่องค้นหา */}
      <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-between my-6 gap-4 lg:gap-6">
        <div className="relative w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search by Route Detail Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-md bg-white text-black border border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-4">
            <MagnifyingGlassIcon className="w-6 h-6 text-sky-500" />
          </div>
        </div>
        <button
          onClick={() => createRouteDetail(routeId)}
          className="w-full lg:w-auto bg-sky-400 text-white px-6 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-sky-600 transition-all duration-300"
        >
          <PlusCircleIcon className="w-6 h-6" />
          <span className="text-lg font-medium">Create Route Details</span>
        </button>
      </div>

      {/* แสดงรายการ routesDetail */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
          <thead className="bg-sky-100 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-center uppercase">#</th>
              <th className="px-4 py-2 text-center uppercase">
                Route Detail Name
              </th>
              <th className="px-4 py-2 text-center uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchedRoutesDetail.length > 0 ? (
              searchedRoutesDetail.map((detail, index) => (
                <tr
                  key={detail.route_detail_id}
                  className="border-b hover:bg-sky-50"
                >
                  <td className="px-4 py-2 text-center text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-600">
                    {detail.route_detail_name}
                  </td>
                  <td className="px-4 py-2 text-center flex gap-2 justify-center">
                    {/* ปุ่ม Edit */}
                    <button
                      onClick={() =>
                        editRouteDetail(
                          detail.route_detail_id,
                          detail.route_detail_name
                        )
                      }
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    {/* ปุ่ม Delete */}
                    <button
                      onClick={() => deleteRouteDetail(detail.route_detail_id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No route details available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
