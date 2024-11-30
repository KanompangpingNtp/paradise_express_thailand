"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import MultiDestinationInput from "../components/Multi-Destination-Input";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const prevDestinations = useRef(formData.tour_highlights_detail); // Using a ref to track the previous destinations

  useEffect(() => {
    prevDestinations.current = formData.tour_highlights_detail;
  }, [formData.tour_highlights_detail]); // Update ref whenever formData changes

  const handleDestinationsChange = (updatedDestinations) => {
    // Only update state if the destinations have actually changed
    if (JSON.stringify(prevDestinations.current) !== JSON.stringify(updatedDestinations)) {
      setFormData((prev) => ({
        ...prev,
        tour_highlights_detail: updatedDestinations,
      }));
    }
  };

  useEffect(() => {
    // Cleanup object URLs to prevent memory leaks
    return () => {
      imageFiles.forEach((imageFile) => {
        if (imageFile.preview) {
          URL.revokeObjectURL(imageFile.preview);
        }
      });
    };
  }, [imageFiles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const maxSize = 2 * 1024 * 1024; // 2 MB
    const files = Array.from(e.target.files);
    const processedFiles = files
      .filter((file) => {
        if (file.size > maxSize) {
          alert(`ไฟล์ ${file.name} มีขนาดเกิน ${maxSize / (1024 * 1024)} MB`);
          return false;
        }
        return true;
      })
      .map((file, index) => ({
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
      setIsSubmitting(true);
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
          const errorData = await response.json();
          alert(`เกิดข้อผิดพลาด: ${errorData.message || response.statusText}`);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-sky-500 to-teal-400 p-6 text-white">
          <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
            <MapPinIcon className="w-8 h-8" />
            สร้างทัวร์ใหม่
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="form-control">
            <label className="label flex items-center gap-2">
              <CameraIcon className="w-5 h-5 text-sky-600" />
              <span className="label-text font-semibold text-gray-700">
                หัวข้อทัวร์
              </span>
            </label>
            <select
              name="tour_section_name"
              value={formData.tour_section_name}
              onChange={handleInputChange}
              className={`input input-bordered bg-gray-200 text-black w-full border-2 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 ${
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
              <MapPinIcon className="w-5 h-5 text-sky-600" />
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
              className={`input input-bordered bg-gray-200 text-black w-full border-2 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 ${
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
              <StarIcon className="w-5 h-5 text-sky-600" />
              <span className="label-text font-semibold text-gray-700">
                รายละเอียดทัวร์
              </span>
            </label>
            <textarea
              name="tour_detail"
              placeholder="ระบุรายละเอียดทัวร์"
              value={formData.tour_detail}
              onChange={handleInputChange}
              className={`textarea textarea-bordered bg-gray-200 text-black w-full h-32 border-2 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 ${
                errors.tour_detail ? "border-red-500" : ""
              }`}
            />
            {errors.tour_detail && (
              <span className="text-red-500 text-sm mt-1">
                {errors.tour_detail}
              </span>
            )}
          </div>

          <MultiDestinationInput
            value={formData.tour_highlights_detail}
            onChange={handleDestinationsChange}
          />

          <div className="form-control">
            <label className="label flex items-center gap-2">
              <CloudArrowUpIcon className="w-5 h-5 text-sky-600" />
              <span className="label-text font-semibold text-gray-700">
                อัปโหลดรูปภาพ
              </span>
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="input input-bordered bg-gray-200 text-black w-full border-2 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            />
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full text-white"
            >
              {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
