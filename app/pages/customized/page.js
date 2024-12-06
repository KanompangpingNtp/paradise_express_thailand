"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2"; // นำเข้า SweetAlert2
import {
  BookOpenIcon,
  CalendarIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeOpenIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import InputField from "@/app/components/InputField";
import PersonCountButton from "@/app/components/PersonCountButton";
import LoadingFornt from "@/app/components/LoadingFornt";

function Page() {
  const [tourDate, setTourDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [totalPersons, setTotalPersons] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tourDetails, setTourDetails] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (
      fullName &&
      email &&
      phone &&
      tourDate &&
      totalPersons > 0 &&
      adults >= 0 &&
      children >= 0 &&
      tourDetails
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [
    fullName,
    email,
    phone,
    tourDate,
    totalPersons,
    adults,
    children,
    tourDetails,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const bookingData = {
      fullName,
      email,
      phone,
      tourDate,
      totalPersons,
      adults,
      children,
      tourDetails,
    };

    try {
      const response = await fetch("/api/send_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "enx1038@gmail.com",
          subject: "Request to create a tour",
          text: `Request Details:
            Full Name: ${bookingData.fullName}
            Email: ${bookingData.email}
            Phone: ${bookingData.phone}
            Tour Date: ${bookingData.tourDate}
            Total Persons: ${bookingData.totalPersons}
            Adults: ${bookingData.adults}
            Children: ${bookingData.children}
            Tour Details: ${bookingData.tourDetails}`,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        console.error("Error:", result.error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to send. Please contact support for assistance.
        Telephone: 098-459-6582 (Within Thailand)
        Oversea Call: +66 98-459-6582
        WhatsApp: 098-459-6582`,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: `Failed to send. Please contact support for assistance.
        Telephone: 098-459-6582 (Within Thailand)
        Oversea Call: +66 98-459-6582
        WhatsApp: 098-459-6582`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonCountChange = (count, adultsCount, childrenCount) => {
    setTotalPersons(count);
    setAdults(adultsCount);
    setChildren(childrenCount);
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // รีเซ็ตเวลาเพื่อเปรียบเทียบวันที่อย่างเดียว

    if (selectedDate <= currentDate) {
      setDateError("Tour date cannot be today or in the past.");
      setTourDate(""); // เคลียร์ค่าของฟิลด์ `Tour Date`
    } else {
      setDateError(""); // หากวันที่ถูกต้องให้ล้างข้อความข้อผิดพลาด
      setTourDate(e.target.value);
    }
  };

  if (isLoading) {
    return (
      <div
      className="bg-cover w-full h-screen flex items-center justify-center px-4 py-6"
      style={{
        backgroundImage: "url('/images/customize/map-location-pin.jpg')",
      }}
      >
        <div className="bg-gray-200 text-gray-700 shadow-2xl shadow-black rounded-lg p-8 w-full max-w-3xl">
        <LoadingFornt />
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div
      className="bg-cover w-full h-screen flex items-center justify-center px-4 py-6"
      style={{
        backgroundImage: "url('/images/customize/map-location-pin.jpg')",
      }}
      >
        <div className="bg-gray-200 text-gray-700 shadow-2xl shadow-black rounded-lg p-8 w-full max-w-3xl">
        <div className="text-center">
          <BookOpenIcon className="w-16 h-16 text-green-500 mx-auto" />
          <p className="text-green-500 font-bold text-lg mt-4">
            Reservation Successful
          </p>
          <p className="text-gray-600">Your booking has been confirmed. Please await further contact.</p>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-cover w-full min-h-screen flex items-center justify-center px-4 py-6"
      style={{
        backgroundImage: "url('/images/customize/map-location-pin.jpg')",
      }}
    >
      <div className="bg-gray-200 text-gray-700 shadow-2xl shadow-black rounded-lg p-8 w-full max-w-3xl">
        <div className="border-orange-500 border-l-4 pl-4 mb-8">
          <h1 className="text-2xl py-4 font-semibold uppercase">Customize</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Tour Date"
              id="tourDate"
              type="date"
              value={tourDate}
              onChange={handleDateChange}
              error={dateError} // เพิ่มการแสดงข้อความข้อผิดพลาด
              icon={<CalendarIcon className="w-5 h-5 text-gray-500" />}
            />
            <PersonCountButton
              label="Number of People"
              onCountChange={handlePersonCountChange}
            />
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
          <InputField
            label="Tour Details"
            id="tourDetails"
            placeholder="Describe the tour you want to go"
            value={tourDetails}
            onChange={(e) => setTourDetails(e.target.value)}
            icon={<DocumentTextIcon className="w-5 h-5 text-gray-500" />}
            isTextArea={true}
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
      </div>
    </div>
  );
}

export default Page;
