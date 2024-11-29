"use client";
import React, { useState } from "react";
import Image from "next/image";
import MultiDestinationInput from "./components/Multi-Destination -Input";
import {
  CameraIcon,
  MapPinIcon,
  StarIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/solid";

export default function TourForm() {
  const [formData, setFormData] = useState({
    tour_section_name: "",
    tour_name: "",
    tour_detail: "",
    tour_highlights_detail: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const processedFiles = files.map((file, index) => ({
      file,
      status: index === 0 ? 1 : 2,
      preview: URL.createObjectURL(file),
    }));
    setImageFiles(processedFiles);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.tour_section_name)
      newErrors.tour_section_name = "กรุณาระบุหัวข้อทัวร์";
    if (!formData.tour_name) newErrors.tour_name = "กรุณาระบุชื่อทัวร์";
    if (!formData.tour_detail)
      newErrors.tour_detail = "กรุณาระบุรายละเอียดทัวร์";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item, index) => {
            formDataToSend.append(`${key}[${index}]`, item);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      imageFiles.forEach((imageFile, index) => {
        formDataToSend.append(`images[${index}]`, imageFile.file);
        formDataToSend.append(`image_status_${index}`, imageFile.status);
      });

      try {
        const response = await fetch("/api/tours", {
          method: "POST",
          body: formDataToSend,
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Tour created successfully:", data);

          setFormData({
            tour_section_name: "",
            tour_name: "",
            tour_detail: "",
            tour_highlights_detail: [],
          });
          setImageFiles([]);
        } else {
          console.error("Failed to create tour:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6 mt-20">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-6 text-white">
          <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
            <MapPinIcon className="w-8 h-8" />
            สร้างทัวร์ใหม่
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="form-control">
            <label className="label flex items-center gap-2">
              <CameraIcon className="w-5 h-5 text-blue-600" />
              <span className="label-text font-semibold text-gray-700">
                หัวข้อทัวร์
              </span>
            </label>
            <select
              name="tour_section_name"
              value={formData.tour_section_name}
              onChange={handleInputChange}
              className={`input input-bordered bg-gray-200 text-black w-full border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                errors.tour_section_name ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                กรุณาเลือกหัวข้อทัวร์
              </option>
              <option value="adventure">การผจญภัย</option>
              <option value="relaxation">การพักผ่อน</option>
              <option value="cultural">การท่องเที่ยวเชิงวัฒนธรรม</option>
              <option value="nature">ธรรมชาติ</option>
            </select>
            {errors.tour_section_name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.tour_section_name}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-blue-600" />
              <span className="label-text font-semibold text-gray-700">
                ชื่อทัวร์
              </span>
            </label>
            <input
              type="text"
              name="tour_name"
              placeholder="ระบุชื่อทัวร์"
              value={formData.tour_name}
              onChange={handleInputChange}
              className={`input input-bordered w-full border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                errors.tour_name ? "border-red-500" : ""
              }`}
            />
            {errors.tour_name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.tour_name}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-blue-600" />
              <span className="label-text font-semibold text-gray-700">
                รายละเอียดทัวร์
              </span>
            </label>
            <textarea
              name="tour_detail"
              placeholder="ระบุรายละเอียดทัวร์"
              value={formData.tour_detail}
              onChange={handleInputChange}
              className={`textarea textarea-bordered w-full h-32 border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                errors.tour_detail ? "border-red-500" : ""
              }`}
            />
            {errors.tour_detail && (
              <span className="text-red-500 text-sm mt-1">
                {errors.tour_detail}
              </span>
            )}
          </div>

          {/* MultiDestinationInput */}
          <MultiDestinationInput
            onDestinationsChange={(updatedDestinations) =>
              setFormData((prev) => ({
                ...prev,
                tour_highlights_detail: updatedDestinations,
              }))
            }
            placeholder="เพิ่มไฮไลท์"
            maxDestinations={5}
          />

          <div className="form-control">
            <label className="label flex items-center gap-2">
              <CloudArrowUpIcon className="w-5 h-5 text-blue-600" />
              <span className="label-text font-semibold text-gray-700">
                แนบไฟล์รูป
              </span>
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="file-input file-input-bordered w-full"
              name="images"
              onChange={handleImageUpload}
            />
            {imageFiles.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {imageFiles.map((imageFile, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform"
                  >
                    <Image
                      src={imageFile.preview}
                      alt={`Preview ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover"
                    />
                    <span className="absolute top-2 right-2 badge badge-primary">
                      Status: {imageFile.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-control mt-8">
            <button
              type="submit"
              className="btn btn-primary w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-bold py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >
              สร้างทัวร์
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
