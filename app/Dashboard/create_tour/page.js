"use client";
import React, { useState, useCallback } from "react";
import MultiDestinationInput from "../components/Multi-Destination-Input";
import Image from "next/image";
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

  const handleDestinationsChange = useCallback((updatedDestinations) => {
    setFormData((prev) => ({
      ...prev,
      tour_highlights_detail: updatedDestinations,
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const maxSize = 2 * 1024 * 1024; // 2MB
    const files = Array.from(e.target.files).filter((file) => {
      if (file.size > maxSize) {
        alert(`ไฟล์ ${file.name} มีขนาดเกิน ${maxSize / (1024 * 1024)} MB`);
        return false;
      }
      return true;
    });

    const newFiles = files.map((file, index) => ({
      file,
      status: imageFiles.length === 0 && index === 0 ? 1 : 2,
      preview: URL.createObjectURL(file),
    }));

    setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveImage = (index) => {
    const newImageFiles = [...imageFiles];
    const removedImage = newImageFiles.splice(index, 1);
    if (removedImage[0]?.preview) {
      URL.revokeObjectURL(removedImage[0].preview);
    }
    setImageFiles(newImageFiles);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.tour_section_name)
      newErrors.tour_section_name = "กรุณาระบุหัวข้อทัวร์";
    if (!formData.tour_name) newErrors.tour_name = "กรุณาระบุชื่อทัวร์";
    if (!formData.tour_detail)
      newErrors.tour_detail = "กรุณาระบุรายละเอียดทัวร์";
    if (
      !formData.tour_highlights_detail ||
      formData.tour_highlights_detail.length === 0
    ) {
      newErrors.tour_highlights_detail = "กรุณาเพิ่มสถานที่ท่องเที่ยว";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true); // เริ่มต้นการส่งข้อมูล

    const formDataToSend = new FormData();
    formDataToSend.append("tour_section_name", formData.tour_section_name);
    formDataToSend.append("tour_name", formData.tour_name);
    formDataToSend.append("tour_detail", formData.tour_detail);

    // สร้าง object สำหรับเก็บข้อมูลทั้งหมดที่เราจะส่ง
    const dataToSend = {
      tour_section_name: formData.tour_section_name,
      tour_name: formData.tour_name,
      tour_detail: formData.tour_detail,
      tour_highlights_detail: formData.tour_highlights_detail,
      images: imageFiles.map((imageFile, index) => ({
        fileName: imageFile.file.name,
        status: imageFile.status,
        preview: imageFile.preview,
      })),
    };

    // log ค่า dataToSend ที่เราจะส่ง
    console.log("Form Data to Send:", dataToSend);

    // ส่งข้อมูล tour_highlights_detail อย่างแยกต่างหาก
    formData.tour_highlights_detail.forEach((highlight, index) => {
      formDataToSend.append("tour_highlights_detail[]", highlight);
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
      alert("ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSubmitting(false); // เสร็จสิ้นการส่งข้อมูล
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
              placeholder="กรอกรายละเอียดทัวร์"
              value={formData.tour_detail}
              onChange={handleInputChange}
              className={`textarea textarea-bordered bg-gray-200 text-black w-full h-40 border-2 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 ${
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
            destinations={formData.tour_highlights_detail}
            onDestinationsChange={handleDestinationsChange}
          />

          <div className="form-control">
            <label className="label flex items-center gap-2">
              <CloudArrowUpIcon className="w-5 h-5 text-sky-600" />
              <span className="label-text font-semibold text-gray-700">
                อัพโหลดรูปภาพ
              </span>
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full text-black"
            />
          </div>

          <div className="image-preview-grid flex gap-4 flex-wrap">
            {imageFiles.map((image, index) => (
              <div key={index} className="relative">
              <Image
                src={image.preview}
                alt={`Uploaded preview ${index + 1}`}
                width={80} // กำหนดขนาดที่คุณต้องการ
                height={80} // กำหนดขนาดที่คุณต้องการ
                className="object-cover rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                ×
              </button>
            </div>

            ))}
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full mt-4 ${
              isSubmitting ? "btn-disabled loading" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "กำลังส่ง..." : "สร้างทัวร์"}
          </button>
        </form>
      </div>
    </div>
  );
}
