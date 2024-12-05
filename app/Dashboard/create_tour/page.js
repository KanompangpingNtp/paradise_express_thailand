"use client";
import React, { useState, useCallback, useEffect } from "react"; // เพิ่ม useEffect
import MultiDestinationInput from "../components/Multi-Destination-Input";
import Image from "next/image";
import {
  SwatchIcon,
  TagIcon,
  MapPinIcon,
  DocumentTextIcon,
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
  const [tourSections, setTourSections] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);

  // ดึงข้อมูลหัวข้อทัวร์จาก API
  useEffect(() => {
    const fetchTourSections = async () => {
      try {
        const response = await fetch("/api/tours"); // URL ของ API ที่ใช้
        if (response.ok) {
          const data = await response.json();
          setTourSections(data); // เก็บข้อมูลใน state
        } else {
          console.log("Failed to fetch tour sections.");
        }
      } catch (error) {
        console.error("Error fetching tour sections:", error);
      }
    };

    fetchTourSections();
  }, []);

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
        alert(`File ${file.name} has more than size ${maxSize / (1024 * 1024)} MB`);
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
      newErrors.tour_section_name = "Please specify the tour title.";
    if (!formData.tour_name) newErrors.tour_name = "Please specify the tour name.";
    if (!formData.tour_detail)
      newErrors.tour_detail = "Please specify the tour details.";
    if (
      !formData.tour_highlights_detail ||
      formData.tour_highlights_detail.length === 0
    ) {
      newErrors.tour_highlights_detail = "Please specify the tour highlights.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isPdf = file.type === "application/pdf";
      if (!isPdf) {
        alert("Please select PDF files only.");
        return;
      }
      setPdfFile(file);
    }
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

    if (pdfFile) {
      formDataToSend.append("pdf_file", pdfFile); // เพิ่มไฟล์ PDF
    }

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
        setPdfFile(null); // ล้างไฟล์ PDF หลังจากส่งข้อมูล
      } else {
        const errorData = await response.json();
        alert(`Errors: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Unable to submit data. Please try again.");
    } finally {
      setIsSubmitting(false); // เสร็จสิ้นการส่งข้อมูล
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center p-4">
      <div className="w-full min-h-screen bg-white rounded-2xl shadow-2xl overflow-hidden p-6">
        <h2 className="text-3xl text-sky-600 font-bold flex items-center justify-center">
          <MapPinIcon className="w-8 h-8 text-sky-400" />
          Create new tour
        </h2>
        <form onSubmit={handleSubmit} className="">
          <div className="form-control">
            <label className="label flex items-center gap-2">
            <SwatchIcon className="w-5 h-5 text-sky-400" />
              <span className="label-text text-sky-600 font-semibold uppercase">
                Tour Title
              </span>
            </label>
            <select
              name="tour_section_name"
              value={formData.tour_section_name}
              onChange={handleInputChange}
              className={`input input-bordered bg-gray-200 text-black border-blue-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 w-full border-2 ${
                errors.tour_section_name ? "border-red-500" : ""
              }`}
            >
              <option value="" disabled hidden>
                Please select the tour title
              </option>
              {tourSections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.tour_section_name}
                </option>
              ))}
            </select>
            {errors.tour_section_name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.tour_section_name}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label flex items-center gap-2">
              <TagIcon className="w-5 h-5 text-sky-400" />
              <span className="label-text font-semibold text-sky-600 uppercase">
                tour name
              </span>
            </label>
            <input
              type="text"
              name="tour_name"
              placeholder="Specify the tour name"
              value={formData.tour_name}
              onChange={handleInputChange}
              className={`input input-bordered bg-gray-200 text-black w-full border-2 border-blue-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 ${
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
              <DocumentTextIcon className="w-5 h-5 text-sky-400" />
              <span className="label-text font-semibold text-sky-600 uppercase">
              Tour Details
              </span>
            </label>
            <textarea
              name="tour_detail"
              placeholder="Specify the tour details"
              value={formData.tour_detail}
              onChange={handleInputChange}
              className={`textarea textarea-bordered bg-gray-200 text-black w-full h-36 border-2 border-blue-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 ${
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
              <CloudArrowUpIcon className="w-5 h-5 text-sky-400" />
              <span className="label-text font-semibold text-sky-600 uppercase">
                upload images
              </span>
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="file-input file-input-bordered bg-gray-200 text-black w-full border-2 border-blue-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
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

          <div className="form-control">
            <label className="label flex items-center gap-2">
              <CloudArrowUpIcon className="w-5 h-5 text-sky-400" />
              <span className="label-text font-semibold text-sky-600 uppercase">
                upload file PDF
              </span>
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
              className="file-input file-input-bordered bg-gray-200 text-black w-full border-2 border-blue-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
            />
          </div>

          {pdfFile && (
            <div className="mt-2">
              <span className="text-gray-600">{pdfFile.name}</span>
              <button
                type="button"
                onClick={() => setPdfFile(null)}
                className="ml-2 text-red-500"
              >
                ×
              </button>
            </div>
          )}

          <button
            type="submit"
            className={`btn btn-primary w-full mt-4 ${
              isSubmitting ? "btn-disabled loading" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "LOADING.." : "TOUR CREATE"}
          </button>
        </form>
      </div>
    </div>
  );
}
