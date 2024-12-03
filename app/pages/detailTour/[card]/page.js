"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Top from "@/app/components/top";
import Image from "next/image";
import InputField from "@/app/components/InputField";
import PersonCountButton from "@/app/components/PersonCountButton";
import TabButton from "@/app/components/TabCard/TabButton";
import TourOverview from "@/app/components/TabCard/TourOverview";
import TourDeatilandCost from "@/app/components/TabCard/TourDeatilandCost";

const DetailTour = () => {
  const searchParams = useSearchParams(); // ใช้ useSearchParams เพื่อดึงข้อมูลจาก URL query
  const [card, setCard] = useState(null);
  const [adults, setAdults] = useState(0); // จำนวนผู้ใหญ่
  const [children, setChildren] = useState(0); // จำนวนเด็ก
  const [totalPersons, setTotalPersons] = useState(0); // จำนวนคนทั้งหมด
  const [tourDate, setTourDate] = useState(""); // วันที่ทัวร์
  const [fullName, setFullName] = useState(""); // ชื่อเต็ม
  const [email, setEmail] = useState(""); // อีเมล
  const [phone, setPhone] = useState(""); // เบอร์โทร
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // ฟังก์ชันเพื่ออัปเดตจำนวนคน
  const handlePersonCountChange = (count, adultsCount, childrenCount) => {
    setTotalPersons(count); // อัพเดตจำนวนคนทั้งหมด
    setAdults(adultsCount); // อัพเดตจำนวนผู้ใหญ่
    setChildren(childrenCount); // อัพเดตจำนวนเด็ก
  };

  // ดึงข้อมูลจาก URL query
  useEffect(() => {
    const cardData = searchParams.get("card");
    if (cardData) {
      setCard(JSON.parse(cardData)); // แปลงข้อมูลจาก query string
    }
  }, [searchParams]);

  console.log(card);
  // ฟังก์ชันเมื่อกด submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      fullName,
      email,
      phone,
      tourDate,
      totalPersons,
      adults,
      children,
      price: 150, // ราคาอ้างอิงต่อคน
      totalPrice: totalPersons * 150, // คำนวณราคาทั้งหมด
    };

    console.log("Booking Data:", bookingData); // ตรวจสอบข้อมูล
    // ที่นี่สามารถส่งข้อมูลนี้ไปยัง API หรือทำการบันทึกข้อมูล
  };

  // กรณีที่ยังไม่ได้รับข้อมูล card
  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Top title={card.title} />
      <div className="w-full bg-white py-12">
        <div className="container mx-auto flex flex-col md:flex-row">
          {/* ฝั่งซ้าย (Image) */}
          <div className="w-full md:w-2/3 p-4">
            <div className="relative h-80">
              <Image
                src={card.image}
                alt={card.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            {/* กล่องข้อความใต้รูปภาพ */}
            <div className="mt-4 p-4 rounded-lg">
              <div className="flex space-x-2 mb-8">
                <TabButton
                  label="Overview"
                  isActive={activeTab === "overview"}
                  onClick={() => handleTabClick("overview")}
                />
                <TabButton
                  label="TourDeatil & Cost"
                  isActive={activeTab === "TourDeatilandCost"}
                  onClick={() => handleTabClick("TourDeatilandCost")}
                />

              </div>

              {activeTab === "overview" && <TourOverview description={card.description} items={card.items} />}
              {activeTab === "TourDeatilandCost" && <TourDeatilandCost/>}
            </div>
          </div>

          {/* ฝั่งขวา (ข้อมูลทัวร์และฟอร์ม) */}
          <div className="w-full md:w-1/3 p-4 flex flex-col">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 ">
              {card.title}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2 py-10 border-y">
              {/* จัดเรียง input date และ PersonCountButton ไว้ข้างกัน */}
              <div className="flex gap-2 items-center">
                <div className="flex-1">
                  <InputField
                    label="Tour Date"
                    id="tourDate"
                    type="date"
                    value={tourDate}
                    onChange={(e) => setTourDate(e.target.value)} // ตั้งค่าตัวแปร tourDate
                  />
                </div>
                <div className="flex-1">
                  <PersonCountButton
                    label="Number of People"
                    onCountChange={handlePersonCountChange} // ส่งข้อมูลจำนวนคน
                  />
                </div>
              </div>
              <InputField
                label="Full Name"
                id="fullName"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)} // ตั้งค่าตัวแปร fullName
              />
              <InputField
                label="Email"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // ตั้งค่าตัวแปร email
              />
              <InputField
                label="Phone Number"
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} // ตั้งค่าตัวแปร phone
              />

              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 duration-300"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTour;