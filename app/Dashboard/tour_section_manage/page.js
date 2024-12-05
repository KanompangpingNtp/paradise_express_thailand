"use client";
import { useRouter } from "next/navigation";
import {
  PencilSquareIcon,
  TrashIcon,
  SwatchIcon,
  PlusCircleIcon,
  TagIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import Loading from "@/app/components/Loading";

export default function TourSectionManage() {
  const [tourSections, setTourSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // สำหรับการทำ route

  useEffect(() => {
    fetchTourSections();
  }, []);

  const fetchTourSections = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/tours_section");
      const data = await response.json();

      if (data.success) {
        setTourSections(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    const { value: newTourSectionName } = await Swal.fire({
      title: "Create New Tour Section",
      input: "text",
      inputLabel: "Enter Tour Section Name",
      showCancelButton: true,
      confirmButtonText: "Create",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value.trim()) {
          return "Tour section name cannot be empty!";
        }
      },
    });

    if (newTourSectionName) {
      try {
        const response = await fetch("/api/tours_section", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tour_section_name: newTourSectionName }),
        });

        const data = await response.json();

        if (data.success) {
          Swal.fire("Success", "Tour section created successfully!", "success");
          fetchTourSections(); // Refresh the list
        } else {
          throw new Error(data.message || "Failed to create tour section");
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  const handleEdit = async (id, currentName) => {
    const { value: newTourSectionName } = await Swal.fire({
      title: "Edit Tour Section",
      input: "text",
      inputLabel: "Enter New Tour Section Name",
      inputValue: currentName,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value.trim()) {
          return "Tour section name cannot be empty!";
        }
      },
    });

    if (newTourSectionName) {
      try {
        const response = await fetch(`/api/tours_section/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tour_section_name: newTourSectionName }),
        });

        const data = await response.json();

        if (data.success) {
          Swal.fire("Success", "Tour section updated successfully!", "success");
          fetchTourSections(); // Refresh the list
        } else {
          throw new Error(data.message || "Failed to update tour section");
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/tours_section/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (data.success) {
          Swal.fire("Deleted!", "Tour section has been deleted.", "success");
          fetchTourSections(); // Refresh the list
        } else {
          throw new Error(data.message || "Failed to delete tour section");
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  const handleViewDetails = (tourSectionName) => {
    // ส่งค่า tour_section_name ไปใน params
    router.push(`/Dashboard/show_tour_list/${tourSectionName}`);
  };

  return (
    <div>
      {loading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}
      <div className="text-3xl text-center font-bold text-sky-600 flex items-center justify-center">
        <SwatchIcon className="w-8 h-8 mr-2" />
        <span>Tour Section Management</span>
      </div>

      <div className="w-full flex justify-center lg:justify-end my-6">
        <button
          onClick={handleCreate}
          className="w-full lg:w-auto bg-sky-400 text-white px-6 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-sky-600 transition-all duration-300"
        >
          <PlusCircleIcon className="w-6 h-6" />
          <span className="text-lg font-medium">Create New Tour Section</span>
        </button>
      </div>

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {tourSections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-lg shadow-md p-4 border border-blue-200 hover:shadow-md hover:shadow-sky-400 duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-sky-600 flex items-center">
                  {section.tour_section_name}
                  <TagIcon className="w-5 h-5 ml-2" />
                </h3>
                <span className="text-sm text-gray-500">ID: {section.id}</span>
              </div>

              <p className="text-sm text-gray-700">
                Number of Tours:{" "}
                <span className="text-lg text-sky-400 font-bold">
                  {section.tour_count}
                </span>
              </p>
              <div className="flex justify-end mt-4 space-x-2">
                {/* แสดงปุ่ม Edit และ Delete เฉพาะถ้า tour_section_name ไม่ใช่ "Tour Asia", "Tour Month", หรือ "Sightseeing" */}
                {section.tour_section_name !== "Tour Asia" &&
                  section.tour_section_name !== "Tour Month" &&
                  section.tour_section_name !== "Sightseeing" && (
                    <>
                      <button
                        onClick={() =>
                          handleEdit(section.id, section.tour_section_name)
                        }
                        className="bg-yellow-400 text-white px-3 py-2 rounded-md hover:bg-yellow-500 flex items-center duration-300"
                      >
                        <PencilSquareIcon className="w-5 h-5 mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(section.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 flex items-center duration-300"
                      >
                        <TrashIcon className="w-5 h-5 mr-2" />
                        Delete
                      </button>
                    </>
                  )}
                <button
                  onClick={() => handleViewDetails(section.tour_section_name)}
                  className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 flex items-center duration-300"
                >
                  <ClipboardDocumentListIcon className="w-5 h-5 mr-2" />
                  <span className="mr-2">Tours</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
