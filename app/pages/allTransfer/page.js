"use client";
import React, { useEffect, useState } from "react";
import LoadingFornt from "@/app/components/LoadingFornt";
import { useRouter } from "next/navigation";
import { SearchIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

function Page() {
  const [routeData, setRouteData] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const response = await fetch("/api/route/route_total");
        const data = await response.json();
        setRouteData(data.routeData || []);
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };

    fetchRouteData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredOptions([]);
    } else {
      const filtered = routeData
        .filter((route) =>
          `${route.province_name} - ${route.route_name} - ${route.route_detail_name}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .slice(0, 5);
      setFilteredOptions(filtered);
    }
  }, [searchTerm, routeData]);

  const handleNextClick = () => {
    if (selectedRoute) {
      // ส่ง selectedRoute ไปใน URL params
      router.push(`/pages/allTransfer/${selectedRoute}`);
    }
  };

  return (
    <div
      className="bg-cover w-full h-screen"
      style={{
        backgroundImage: "url('/images/Transfer/berlin_bg-1.jpg')",
      }}
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-gray-200 text-gray-700 px-4 py-12 shadow-2xl shadow-black w-full max-w-3xl">
          <div className="text-3xl font-bold mb-6 uppercase border-orange-500 border-l-4 py-4 pl-6">
            Select Your Route
          </div>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a route..."
              className="block w-full px-6 py-4 mb-4 text-lg bg-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {filteredOptions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-auto">
                {filteredOptions.map((route) => (
                  <li
                    key={route.route_total_id}
                    onClick={() => {
                      setSelectedRoute(route.route_total_id);
                      setSearchTerm(
                        `${route.province_name} - ${route.route_name} - ${route.route_detail_name}`
                      );
                      setFilteredOptions([]);
                    }}
                    className="px-6 py-3 hover:bg-gray-200 cursor-pointer text-lg"
                  >
                    {`${route.province_name} - ${route.route_name} - ${route.route_detail_name}`}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {selectedRoute && (
            <div className="mt-6 flex justify-center w-full">
              <button
                onClick={handleNextClick}
                className="px-6 py-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 duration-300 w-full max-w-xs flex items-center justify-center"
              >
                <ArrowRightIcon className="w-5 h-5 mr-2" />
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
