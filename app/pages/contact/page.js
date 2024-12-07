"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2"; // นำเข้า SweetAlert2
import {
  PhoneIcon,
  EnvelopeOpenIcon,
  UserIcon,
  DocumentTextIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import InputField from "@/app/components/InputField";
import LoadingFornt from "@/app/components/LoadingFornt";

function Page() {
  const [tourDate, setTourDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (fullName && email && phone && message && tourDate) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [fullName, email, phone, message, tourDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const contactData = {
      fullName,
      email,
      phone,
      tourDate,
      message,
    };

    try {
      const response = await fetch("/api/send_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "enx1038@gmail.com",
          subject: "Contact Request",
          text: `Contact Details:
            Full Name: ${contactData.fullName}
            Email: ${contactData.email}
            Phone: ${contactData.phone}
            Date: ${contactData.tourDate}
            Message: ${contactData.message}`,
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
          text: "Failed to send your message. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: "Failed to send your message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate <= currentDate) {
      setDateError("The date cannot be today or in the past.");
      setTourDate(""); // Clear the date field
    } else {
      setDateError("");
      setTourDate(e.target.value);
    }
  };

  if (isLoading) {
    return (
      <div
        className="bg-cover w-full h-screen flex items-center justify-center px-4 py-6"
        style={{
          backgroundImage: "url('/images/contact/marcom-contact-bg-bg.jpg')",
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
          backgroundImage: "url('/images/contact/marcom-contact-bg-bg.jpg')",
        }}
      >
        <div className="bg-gray-200 text-gray-700 shadow-2xl shadow-black rounded-lg p-8 w-full max-w-3xl">
          <div className="text-center">
            <EnvelopeOpenIcon className="w-16 h-16 text-green-500 mx-auto" />
            <p className="text-green-500 font-bold text-lg mt-4">
              Message Sent Successfully
            </p>
            <p className="text-gray-600">
              Thank you for reaching out to us. We will get back to you soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-cover w-full min-h-screen flex items-center justify-center px-4 py-6"
      style={{
        backgroundImage: "url('/images/contact/marcom-contact-bg-bg.jpg')",
      }}
    >
      <div className="bg-gray-200 text-gray-700 shadow-2xl shadow-black rounded-lg p-8 w-full max-w-3xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-orange-500 border-l-4 pl-4 mb-8">
          {/* ส่วนหัวข้อด้านซ้าย */}
          <h1 className="text-2xl py-4 font-semibold uppercase">Contact</h1>

          {/* ส่วนข้อความด้านขวา */}
          <div className="text-sm md:text-right text-gray-600 space-y-1 mt-4 md:mt-0">
            <p>WhatsApp: 098-459-6582</p>
            <p>Oversea Call: +66 98-459-6582</p>
            <p>Telephone: 098-459-6582 (Within Thailand)</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Date"
            id="tourDate"
            type="date"
            value={tourDate}
            onChange={handleDateChange}
            error={dateError}
            icon={<CalendarIcon className="w-5 h-5 text-gray-500" />}
          />
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
            label="Message"
            id="message"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
            <EnvelopeOpenIcon className="w-5 h-5" />
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
