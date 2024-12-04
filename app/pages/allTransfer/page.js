"use client";
import { useState } from "react";

function Page() {
  const [selectedProvince, setSelectedProvince] = useState(""); // จังหวัดที่เลือก
  const [selectedTour, setSelectedTour] = useState(""); // หัวข้อทัวร์ที่เลือก
  const [selectedDetailTour, setSelectedDetailTour] = useState(""); // รายละเอียดทัวร์ที่เลือก
  const [selectedDate, setSelectedDate] = useState(""); // วันที่ที่เลือก
  const [isNextVisible, setIsNextVisible] = useState(false); // การแสดงปุ่ม Next

  // ข้อมูลที่เป็นจังหวัด, หัวข้อทัวร์, และรายละเอียดทัวร์
  const provinces = [
    {
      name: "Bangkok",
      tours: [
        {
          name: "Tour 1",
          details: ["Detail 1A", "Detail 1B", "Detail 1C"],
        },
        {
          name: "Tour 2",
          details: ["Detail 2A", "Detail 2B", "Detail 2C"],
        },
      ],
    },
    {
      name: "Chiang Mai",
      tours: [
        {
          name: "Tour A",
          details: ["Detail A1", "Detail A2", "Detail A3"],
        },
        {
          name: "Tour B",
          details: ["Detail B1", "Detail B2", "Detail B3"],
        },
      ],
    },
    {
      name: "Phuket",
      tours: [
        {
          name: "Tour X",
          details: ["Detail X1", "Detail X2", "Detail X3"],
        },
        {
          name: "Tour Y",
          details: ["Detail Y1", "Detail Y2", "Detail Y3"],
        },
      ],
    },
  ];

  // ฟังก์ชันเมื่อเลือกจังหวัด
  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedTour(""); // รีเซ็ตการเลือกหัวข้อทัวร์
    setSelectedDetailTour(""); // รีเซ็ตการเลือกรายละเอียดทัวร์
    setIsNextVisible(false); // ซ่อนปุ่ม Next เมื่อเริ่มใหม่
  };

  // ฟังก์ชันเมื่อเลือกหัวข้อทัวร์
  const handleTourChange = (event) => {
    setSelectedTour(event.target.value);
    setSelectedDetailTour(""); // รีเซ็ตการเลือกรายละเอียดทัวร์
    setIsNextVisible(false); // ซ่อนปุ่ม Next เมื่อเริ่มใหม่
  };

  // ฟังก์ชันเมื่อเลือกรายละเอียดทัวร์
  const handleDetailTourChange = (event) => {
    setSelectedDetailTour(event.target.value);
    setIsNextVisible(true); // แสดงปุ่ม Next เมื่อเลือกรายละเอียดทัวร์
  };

  // ฟังก์ชันเมื่อเลือกวันที่
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // หาข้อมูลของจังหวัดที่เลือก
  const selectedProvinceData = provinces.find(
    (province) => province.name === selectedProvince
  );

  // หาข้อมูลของหัวข้อทัวร์ที่เลือกจากจังหวัดที่เลือก
  const selectedTourData =
    selectedProvinceData?.tours.find((tour) => tour.name === selectedTour);

  // ฟังก์ชันเมื่อคลิกปุ่ม Next
  const handleNextClick = () => {
    // ส่งข้อมูลที่เก็บทั้งหมดไป (ในที่นี้จะเป็นการแสดงใน console)
    console.log({
      selectedProvince,
      selectedTour,
      selectedDetailTour,
      selectedDate,
    });
    // คุณสามารถนำข้อมูลไปทำการบันทึกหรือส่งไปยัง backend ได้ที่นี่
  };

  return (
    <div
      className="bg-cover w-full h-screen"
      style={{
        backgroundImage: "url('/images/Transfer/berlin_bg-1.jpg')", // กำหนดรูปภาพเป็นพื้นหลัง
      }}
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-gray-200 text-gray-700 px-4 py-12 shadow-2xl shadow-black">
          <div className="border-orange-500 border-l-4 text-2xl p-6 mb-5">
            Select your province, tour, detail tour, and date
          </div>

          {/* ช่อง select สำหรับจังหวัด */}
          <div className="relative w-full px-2 mb-4">
            <select
              value={selectedProvince}
              onChange={handleProvinceChange}
              className="block w-full px-4 py-3 bg-gray-300 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select Province
              </option>
              {provinces.map((province, index) => (
                <option key={index} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>

          {/* ช่อง select สำหรับหัวข้อทัวร์ */}
          {selectedProvince && (
            <div className="relative w-full px-2 mb-4">
              <select
                value={selectedTour}
                onChange={handleTourChange}
                className="block w-full px-4 py-3 bg-gray-300 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Select Tour
                </option>
                {selectedProvinceData?.tours.map((tour, index) => (
                  <option key={index} value={tour.name}>
                    {tour.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* ช่อง select สำหรับรายละเอียดทัวร์ */}
          {selectedTour && (
            <div className="relative w-full px-2 mb-4">
              <select
                value={selectedDetailTour}
                onChange={handleDetailTourChange}
                className="block w-full px-4 py-3 bg-gray-300 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Select Detail Tour
                </option>
                {selectedTourData?.details.map((detail, index) => (
                  <option key={index} value={detail}>
                    {detail}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* ช่อง input date เมื่อเลือกข้อมูลในช่อง 3 */}
          {selectedDetailTour && (
            <div className="relative w-full px-2 mb-4">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="block w-full px-4 py-3 bg-gray-300 border border-gray-300 rounded-md"
              />
            </div>
          )}

          {/* ปุ่ม Next ที่จะแสดงหลังจากเลือกข้อมูลครบ */}
          {isNextVisible && selectedDate && (
            <div className="flex justify-center w-full">
              <button
                onClick={handleNextClick}
                className="px-6 py-3 mt-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 duration-300 w-full hover:tracking-widest"
              >
                NEXT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
