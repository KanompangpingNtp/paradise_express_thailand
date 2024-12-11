"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react"; // import Dialog
import Select2Component from "./Select2Component";
import InputWithSubmit from "./InputWithSubmit";
import Swal from "sweetalert2";
import "./page.css";
import Loading from "@/app/components/Loading";
import {
  TrashIcon,
  DocumentIcon,
  XMarkIcon,
  PhotoIcon,
  MapPinIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

function Page() {
  const [options, setOptions] = useState([]);
  const [carBrands, setCarBrands] = useState([]);
  const [data, setData] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedCarBrand, setSelectedCarBrand] = useState(null);
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // สร้าง state สำหรับเก็บคำค้นหา
  // State สำหรับการเปิด/ปิด dialog
  const [isOpen, setIsOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/route/route_total");
      const data = await response.json();
      if (response.ok) {
        // ตรวจสอบว่ามีข้อมูลหรือไม่
        setOptions(data.routesDetail || []); // ใช้ [] ถ้าไม่มีข้อมูล
        setCarBrands(data.carBrandsData || []); // ใช้ [] ถ้าไม่มีข้อมูล
        setData(data.routeData || []); // ใช้ [] ถ้าไม่มีข้อมูล
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load data. Please try again.",
        confirmButtonColor: "#3498db",
      });
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRoute || !selectedCarBrand || !price) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required. Please select route, car brand, and enter a price.",
        confirmButtonColor: "#3498db",
      });
      return;
    }

    const dataToSubmit = {
      route_detail_id: selectedRoute,
      car_model_id: selectedCarBrand,
      data_price: price,
    };

    try {
      const response = await fetch("/api/route/route_total", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });
      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Data submitted successfully!",
          confirmButtonColor: "#3498db",
        });
      } else {
        throw new Error(result.message || "Failed to submit data");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "An error occurred while submitting data.",
        confirmButtonColor: "#3498db",
      });
    }
  };

  // เพิ่มฟังก์ชันสำหรับการลบ
  const handleDelete = async (routeDetailId) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        const response = await fetch(
          `/api/route/route_total/${routeDetailId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          const isJson = response.headers
            .get("content-type")
            ?.includes("application/json");
          const result = isJson ? await response.json() : {}; // อ่านเฉพาะเมื่อเป็น JSON
          await fetchData();
          Swal.fire("Deleted!", "Your data has been deleted.", "success");
        } else {
          const error = await response.json();
          throw new Error(error.message || "Failed to delete the data.");
        }
      } catch (error) {
        console.error("Error deleting data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "An error occurred while deleting the data.",
          confirmButtonColor: "#3498db",
        });
      }
    }
  };

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => {
    setIsOpen(false); // ปิด Dialog
    fetchData(); // เรียก fetchData เพื่ออัปเดตข้อมูล
  };

  // ฟังก์ชันกรองข้อมูลตามคำค้นหา
  const filteredData = data.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.province_name.toLowerCase().includes(searchLower) ||
      item.route_name.toLowerCase().includes(searchLower) ||
      item.route_detail_name.toLowerCase().includes(searchLower) ||
      item.car_brand_name.toLowerCase().includes(searchLower) ||
      item.car_model_name.toLowerCase().includes(searchLower)
    );
  });
  console.log(filteredData);
  return (
    <div>
      {loading ? (
        // แสดง Loading Component เมื่อกำลังโหลดข้อมูล
        <Loading />
      ) : (
        <>
          <div className="text-3xl text-center font-bold text-sky-600 flex items-center justify-center mb-10">
            <ClipboardDocumentListIcon className="w-8 h-8 mr-2" />
            Connect Line
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-between my-6 gap-4 lg:gap-6">
            <div className="relative w-full lg:w-auto">
              <input
                type="text"
                placeholder="Search by Name or Highlight..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-md bg-white text-black border border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-4">
                <MagnifyingGlassIcon className="w-6 h-6 text-sky-500" />
              </div>
            </div>
            <button
              onClick={openDialog}
              className="w-full lg:w-auto bg-sky-400 text-white px-6 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-sky-600 transition-all duration-300"
            >
              <PlusCircleIcon className="w-6 h-6" />
              <div className="text-lg font-medium">Create Links</div>
            </button>
          </div>

          {/* Dialog */}
          {isOpen && (
            <Dialog
              open={isOpen}
              onClose={closeDialog}
              className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
            >
              <div className="bg-white p-6 rounded-lg w-2/3 max-w-4xl relative">
                <h3 className="text-2xl font-semibold text-sky-700 mb-4">
                  Link
                </h3>
                {/* Select2 Components */}
                <Select2Component
                  id="my-select"
                  label="Select Route"
                  options={
                    options?.map((option) => ({
                      id: option.route_detail_id,
                      name: `${option.province_name} - ${option.route_name} - ${option.route_detail_name}`,
                    })) || []
                  } // ใช้ [] ถ้า options เป็น undefined หรือ null
                  onSelect={setSelectedRoute}
                  loading={loading}
                />

                <Select2Component
                  id="car-brands-select"
                  label="Select Car Brand"
                  options={
                    carBrands?.map((brand) => ({
                      id: brand.car_model_id,
                      name: `${brand.car_brand_name} - ${brand.car_model_name}`,
                    })) || []
                  } // ใช้ [] ถ้า carBrands เป็น undefined หรือ null
                  onSelect={setSelectedCarBrand}
                  loading={loading}
                />

                {/* Input and Submit */}
                <InputWithSubmit
                  price={price}
                  setPrice={setPrice}
                  handleSubmit={handleSubmit}
                />

                <button
                  onClick={closeDialog}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </Dialog>
          )}

          {/* Data Table */}
          <div className="mt-6 min-h-screen overflow-x-auto">
            <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
              <thead className="bg-sky-100 text-gray-600 text-md">
                <tr>
                  <th className="px-4 py-2 text-center uppercase">
                    Province Name
                  </th>
                  <th className="px-4 py-2 text-center uppercase">
                    Route Name
                  </th>
                  <th className="px-4 py-2 text-center uppercase">
                    Route Detail Name
                  </th>
                  <th className="px-4 py-2 text-center uppercase">Brand Car</th>
                  <th className="px-4 py-2 text-center uppercase">Car Name</th>
                  <th className="px-4 py-2 text-center uppercase">Price</th>
                  <th className="px-4 py-2 text-center uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-sky-50 text-sm"
                    >
                      <td className="px-4 py-2 text-center text-gray-600">
                        {item.province_name}
                      </td>
                      <td className="px-4 py-2 text-center text-gray-600">
                        {item.route_name}
                      </td>
                      <td className="px-4 py-2 text-center text-gray-600 relative">
                        <div
                          className="text-sky-500 hover:underline"
                          style={{
                            maxWidth: "200px",
                            display: "inline-block",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={item.route_detail_name}
                        >
                          {item.route_detail_name.length > 20
                            ? `${item.route_detail_name.slice(0, 20)}...`
                            : item.route_detail_name}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center text-gray-600">
                        {item.car_brand_name}
                      </td>
                      <td className="px-4 py-2 text-center text-gray-600">
                        {item.car_model_name}
                      </td>
                      <td className="px-4 py-2 text-center text-gray-600">
                        {item.data_price}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => handleDelete(item.route_total_id)}
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          <TrashIcon className="w-5 h-5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-2 text-center" colSpan={6}>
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
