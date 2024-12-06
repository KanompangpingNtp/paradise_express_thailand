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
import ImageSlider from "@/app/components/ImageSlider";
import LoadingFornt from "@/app/components/LoadingFornt";
import {
  BookOpenIcon,
  CalendarIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeOpenIcon,
} from "@heroicons/react/24/outline";

const DetailTour = () => {
  const searchParams = useSearchParams();
  const [card, setCard] = useState(null);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [totalPersons, setTotalPersons] = useState(0);
  const [tourDate, setTourDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [nameTour, setNameTour] = useState("");
  const [section_nameTour, setSection_NameTour] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // เพิ่มตัวแปรนี้เพื่อตรวจสอบว่าได้ submit แล้วหรือยัง

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // ฟังก์ชันเพื่ออัปเดตจำนวนคน
  const handlePersonCountChange = (count, adultsCount, childrenCount) => {
    setTotalPersons(count);
    setAdults(adultsCount);
    setChildren(childrenCount);
  };

  // เช็คว่าได้รับค่าครบถ้วนหรือยัง
  useEffect(() => {
    if (
      fullName &&
      email &&
      phone &&
      tourDate &&
      totalPersons > 0 &&
      adults >= 0 &&
      children >= 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [fullName, email, phone, tourDate, totalPersons, adults, children]);

  // ดึงข้อมูลจาก URL query
  useEffect(() => {
    const cardData = searchParams.get("card");
    if (cardData) {
      const parsedCard = JSON.parse(cardData);
      setCard(parsedCard);
      if (parsedCard.name) {
        setNameTour(parsedCard.name);
      }
      if (parsedCard.section_name) {
        setSection_NameTour(parsedCard.section_name);
      }
    }
  }, [searchParams]);

  // ฟังก์ชันเมื่อกด submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsFormSubmitted(true); // ตั้งค่าให้ฟอร์มถูกซ่อนหลังจากการ submit
    const bookingData = {
      fullName,
      email,
      phone,
      tourDate,
      totalPersons,
      adults,
      children,
      nameTour: card.name,
      section_nameTour: activeTab,
    };

    try {
      const response = await fetch("/api/send_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "Akpailin@gmail.com",
          subject: "Booking Tour",
          text: `Booking Details:
            Full Name: ${bookingData.fullName}
            Email: ${bookingData.email}
            Phone: ${bookingData.phone}
            Section: ${bookingData.section_nameTour}
            Tour Name: ${bookingData.nameTour}
            Tour Date: ${bookingData.tourDate}
            Total Persons: ${bookingData.totalPersons}
            Adults: ${bookingData.adults}
            Children: ${bookingData.children}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setFeedbackMessage("Your booking has been confirmed. Please await further contact.");
      setMessageType("success");
    } catch (error) {
      setFeedbackMessage(`Failed to send. Please contact support for assistance.
        Telephone: 098-459-6582 (Within Thailand)
        Oversea Call: +66 98-459-6582
        WhatsApp: 098-459-6582`);
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!card) {
    return <LoadingFornt/>;
  }

  return (
    <div>
      <Top title={card.name} />
      <div className="w-full bg-white py-12">
        <div className="container mx-auto flex flex-col md:flex-row">
          {/* ฝั่งซ้าย (Image) */}
          <div className="w-full md:w-2/3 p-4">
            <div className="relative h-[60vh] border">
              <ImageSlider images={card.images} />
            </div>
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
              {activeTab === "overview" && (
                <TourOverview
                  description={card.detail}
                  items={card.highlights}
                />
              )}
              {activeTab === "TourDeatilandCost" && (
                <TourDeatilandCost pdf={card.pdf} />
              )}
            </div>
          </div>

          {/* ฝั่งขวา (ข้อมูลทัวร์และฟอร์ม) */}
          <div className="w-full md:w-1/3 p-4 flex flex-col text-gray-700">
            <h1 className="text-3xl font-bold mb-2 text-gray-700">
              {card.name}
            </h1>

            {/* แสดงฟอร์ม หรือ Loading */}
            {isFormSubmitted ? (
              <div className="text-center text-lg font-semibold text-gray-700 py-10 border-y">
                {isLoading ? (
                  <div className="flex justify-center items-center space-x-2">
                    <svg
                      className="w-6 h-6 animate-spin text-orange-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 0116 0"
                      ></path>
                    </svg>
                    <span>Loading...</span>
                  </div>
                ) : (
                  <div
                    className={`p-4 rounded-md max-w-xl mx-auto mt-4 ${
                      messageType === "success"
                        ? "text-green-500 border-green-700"
                        : "text-red-500 border-red-700"
                    }`}
                  >
                    <p>{feedbackMessage}</p>
                  </div>
                )}
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 pt-2 py-10 border-y"
              >
                <div className="flex gap-2 items-center">
                  <div className="flex-1">
                    <InputField
                      label="Tour Date"
                      id="tourDate"
                      type="date"
                      value={tourDate}
                      onChange={(e) => setTourDate(e.target.value)}
                      icon={<CalendarIcon className="w-5 h-5 text-gray-500" />}
                    />
                  </div>
                  <div className="flex-1">
                    <PersonCountButton
                      label="Number of People"
                      onCountChange={handlePersonCountChange}
                    />
                  </div>
                </div>
                <InputField
                  label="Full Name"
                  id="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  icon={<UserIcon className="w-5 h-5 text-gray-500" />}
                />
                <InputField
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<EnvelopeOpenIcon className="w-5 h-5 text-gray-500" />}
                />
                <InputField
                  label="Phone Number"
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  icon={<PhoneIcon className="w-5 h-5 text-gray-500" />}
                />
                <button
                  type="submit"
                  disabled={isButtonDisabled}
                  className={`w-full ${
                    isButtonDisabled
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-orange-500"
                  } text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 duration-300 flex items-center justify-center space-x-2`}
                >
                  <BookOpenIcon className="w-5 h-5" />
                  <span>Reserve Now</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTour;
