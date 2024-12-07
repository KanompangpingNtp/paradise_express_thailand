"use client";
import React, { useState, useCallback } from "react"; // ใช้ useState และ useCallback
import Swal from "sweetalert2";
import { MapPinIcon, TagIcon, CloudArrowUpIcon, DocumentTextIcon } from "@heroicons/react/24/solid";

function CarModelForm({ onClose, carBrandName }) {
  const [carModelName, setCarModelName] = useState("");
  const [carImagesFile, setCarImagesFile] = useState([]);
  const [carBrandId] = useState(carBrandName); // carBrandId ที่อาจจะได้จาก props
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle image file upload
  const handleImageUpload = (e) => {
    const maxSize = 2 * 1024 * 1024; // 2MB
    const files = Array.from(e.target.files).filter((file) => {
      if (file.size > maxSize) {
        alert(`File ${file.name} exceeds the maximum size of 2MB.`);
        return false;
      }
      return true;
    });

    const newFiles = files.map((file, index) => ({
      file,
      status: carImagesFile.length === 0 && index === 0 ? 1 : 2, // กำหนดสถานะไฟล์
      preview: URL.createObjectURL(file), // สร้าง URL เพื่อแสดงพรีวิว
    }));

    setCarImagesFile((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Remove image file
  const handleRemoveImage = (index) => {
    const newCarImagesFile = [...carImagesFile];
    const removedImage = newCarImagesFile.splice(index, 1);
    if (removedImage[0]?.preview) {
      URL.revokeObjectURL(removedImage[0].preview); // รีบล็อก URL ของไฟล์ที่ลบ
    }
    setCarImagesFile(newCarImagesFile);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!carModelName || carImagesFile.length === 0) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      // สร้าง FormData
      const formData = new FormData();
      formData.append("car_model_name", carModelName);
      formData.append("car_brand_id", carBrandId);

      carImagesFile.forEach((imageFile) => {
        console.log("Adding file:", imageFile.file);
        formData.append("images[]", imageFile.file);
      });

      const response = await fetch("/api/car/manage_car_model", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Car model has been created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          onClose();
        });
        setCarModelName("");
        setCarImagesFile([]);
      } else {
        setError(result.error || "Failed to create car model");
      }
    } catch (err) {
      setError("An error occurred while creating the car model.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-sky-600 font-bold flex items-center justify-center mb-6">
        <MapPinIcon className="w-8 h-8 text-sky-400" />
        Create Car Model
      </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* ชื่อรุ่นรถ */}
        <div className="form-control mb-4">
          <label className="label flex items-center gap-2">
            <TagIcon className="w-5 h-5 text-sky-400" />
            <span className="label-text font-semibold text-sky-600 uppercase">
              Car Model Name
            </span>
          </label>
          <input
            type="text"
            value={carModelName}
            onChange={(e) => setCarModelName(e.target.value)}
            required
            className={`input input-bordered bg-gray-200 text-black w-full border-2 border-blue-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 ${
              error && !carModelName ? "border-red-500" : ""
            }`}
          />
          {error && !carModelName && (
            <span className="text-red-500 text-sm mt-1">
              Please specify the car model name.
            </span>
          )}
        </div>

        {/* ช่องสำหรับอัปโหลดรูปภาพ */}
        <div className="form-control mb-4">
          <label className="label flex items-center gap-2">
            <CloudArrowUpIcon className="w-5 h-5 text-sky-400" />
            <span className="label-text font-semibold text-sky-600 uppercase">
              Upload Images
            </span>
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            accept="image/*"
            required
            className="file-input file-input-bordered bg-gray-200 text-black w-full border-2 border-blue-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
          />
          {carImagesFile.length === 0 && error && (
            <span className="text-red-500 text-sm mt-1">Please upload at least one image.</span>
          )}
        </div>

        {/* พรีวิวรูปภาพ */}
        <div className="image-preview-grid flex gap-4 flex-wrap mb-4">
          {carImagesFile.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image.preview}
                alt={`Uploaded preview ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg shadow-md"
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

        <div className="form-control mb-6">
          <button
            type="submit"
            disabled={loading}
            className={`bg-sky-400 text-white px-6 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-sky-600 transition-all duration-300 w-full mt-4 ${
              loading ? "btn-disabled loading" : ""
            }`}
          >
            {loading ? "LOADING..." : "Create Car Model"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CarModelForm;
