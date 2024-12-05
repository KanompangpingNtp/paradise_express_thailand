"use client";

import { useState, useEffect } from "react";
import {
  DocumentTextIcon,
  UsersIcon,
  UserIcon,
} from "@heroicons/react/24/outline"; // ใช้ไอคอนจาก Heroicons v2
import Loading from "@/app/components/Loading"; // คอมโพเนนต์ Loading
import Link from "next/link";

export default function Dashboard() {
  const [tourSectionsCount, setTourSectionsCount] = useState(null);
  const [toursCount, setToursCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/count");
        const data = await response.json();

        if (data.success) {
          setTourSectionsCount(data.data.tour_sections_count);
          setToursCount(data.data.tours_count);
        } else {
          throw new Error(data.message || "Failed to fetch data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-10">
      {loading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}

      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-5xl font-bold text-sky-600 flex items-center gap-3">
          <span>Dashboard</span>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* จำนวน Tour Sections */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-xl font-semibold text-sky-600">
                Tour Sections
              </div>
              <div className="text-4xl font-bold">
                {tourSectionsCount !== null ? tourSectionsCount : "Loading..."}
              </div>
            </div>
            <DocumentTextIcon className="w-10 h-10 text-sky-600" />
          </div>
        </div>

        {/* จำนวน Tours */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-xl font-semibold text-sky-600">Tours</div>
              <div className="text-4xl font-bold">
                {toursCount !== null ? toursCount : "Loading..."}
              </div>
            </div>
            <DocumentTextIcon className="w-10 h-10 text-sky-600" />
          </div>
        </div>

        {/* การ์ดข้อมูลผู้ใช้ */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-xl font-semibold text-sky-600">Users</div>
              <div className="text-4xl font-bold">128</div> {/* จำนวนผู้ใช้ */}
            </div>
            <UsersIcon className="w-10 h-10 text-sky-600" />
          </div>
        </div>

        {/* การ์ดผู้ใช้งาน */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-xl font-semibold text-sky-600">
                Active Users
              </div>
              <div className="text-4xl font-bold">85</div>{" "}
              {/* จำนวนผู้ใช้งาน */}
            </div>
            <UserIcon className="w-10 h-10 text-sky-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions Section - ปุ่มด่วน */}
      <div className="mt-8 flex justify-between gap-6">
        <Link
          href="/Dashboard/tour_section_manage"
          className="px-6 py-3 text-center bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 transition-all w-full"
        >
          Add New Tours
        </Link>
        <button className="px-6 py-3 bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 transition-all w-full">
          Add New Transfer
        </button>
      </div>
    </div>
  );
}
