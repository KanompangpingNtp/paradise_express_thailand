// components/PersonCountButton.js
import { useState } from "react";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/outline";

const PersonCountButton = ({ label, onCountChange }) => {
  // สเตทสำหรับการเปิด/ปิดของดรอปดาว
  const [isOpen, setIsOpen] = useState(false);
  // สเตทสำหรับเก็บจำนวนผู้ใหญ่และเด็ก
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  // ฟังก์ชันสำหรับเปิด/ปิดดรอปดาว
  const toggleDropdown = () => setIsOpen(!isOpen);

  // คำนวณผลรวมของผู้ใหญ่และเด็ก
  const totalPersons = adults + children;

  // ส่งข้อมูลจำนวนคนกลับไปที่ผู้ใช้ component
  const handleConfirm = () => {
    onCountChange(totalPersons, adults, children); // ส่งทั้ง totalPersons, adults, และ children
    setIsOpen(false); // ปิด dropdown หลังจากยืนยัน
  };

  return (
    <div className="relative">
      <label className="block mb-2 text-sm text-end font-semibold text-gray-700">{label}</label>
      {/* ปุ่มแสดงจำนวนคน */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="bg-orange-500 text-white text-xl mt-1 px-4 py-2 rounded-md focus:outline-none flex items-center justify-center w-full hover:bg-orange-600 duration-300"
      >
        <UserIcon className="h-5 w-5 text-white" />
        <XMarkIcon className="h-5 w-5 text-white" />
        <span>{totalPersons > 0 ? `${totalPersons}` : "0"}</span>
      </button>

      {/* ดรอปดาวสำหรับกรอกจำนวนคน */}
      {isOpen && (
        <div className="absolute top-full right-0 w-full bg-white border rounded-md shadow-lg p-4 z-10">
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="adults" className="block text-sm font-semibold text-gray-700">
                Adults
              </label>

              <input
                type="number"
                id="adults"
                placeholder="0"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                min="0"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white"
              />
            </div>
            <div>
              <label htmlFor="children" className="block text-sm font-semibold text-gray-700">
                Children
              </label>
              <input
                type="number"
                id="children"
                placeholder="0"
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                min="0"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white"
              />
            </div>
          </div>

          {/* ปุ่มยืนยัน */}
          <button
            onClick={handleConfirm}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-orange-600 duration-300"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonCountButton