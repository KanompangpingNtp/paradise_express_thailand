"use client";
import { useRouter } from "next/navigation";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
  TagIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import Loading from "@/app/components/Loading";

export default function ProvinceManage() {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // สำหรับการทำ route

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/route");
      const data = await response.json();

      if (data.success) {
        setProvinces(data.data);
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
    const { value: newProvinceName } = await Swal.fire({
      title: "Create New Province",
      input: "text",
      inputLabel: "Enter Province Name",
      showCancelButton: true,
      confirmButtonText: "Create",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value.trim()) {
          return "Province name cannot be empty!";
        }
      },
    });

    if (newProvinceName) {
      try {
        const response = await fetch("/api/route", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ province_name: newProvinceName }),
        });

        const data = await response.json();

        if (data.success) {
          Swal.fire("Success", "Province created successfully!", "success");
          fetchProvinces(); // Refresh the list
        } else {
          throw new Error(data.message || "Failed to create province");
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  const handleEdit = async (id, currentName) => {
    const { value: newProvinceName } = await Swal.fire({
      title: "Edit Province",
      input: "text",
      inputLabel: "Enter New Province Name",
      inputValue: currentName,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value.trim()) {
          return "Province name cannot be empty!";
        }
      },
    });

    if (newProvinceName) {
      try {
        const response = await fetch(`/api/route/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ province_name: newProvinceName }),
        });

        const data = await response.json();

        if (data.success) {
          Swal.fire("Success", "Province updated successfully!", "success");
          fetchProvinces(); // Refresh the list
        } else {
          throw new Error(data.message || "Failed to update province");
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
        const response = await fetch(`/api/route/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (data.success) {
          Swal.fire("Deleted!", "Province has been deleted.", "success");
          fetchProvinces(); // Refresh the list
        } else {
          throw new Error(data.message || "Failed to delete province");
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  const handleViewDetails = (provinceName) => {
    router.push(`/Dashboard/show_route_list/${provinceName}`);
  };

  return (
    <div>
      {loading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}
      <div className="text-3xl text-center font-bold text-sky-600 flex items-center justify-center">
        <ClipboardDocumentListIcon className="w-8 h-8 mr-2" />
        <span>Province Management</span>
      </div>

      <div className="w-full flex justify-center lg:justify-end my-6">
        <button
          onClick={handleCreate}
          className="w-full lg:w-auto bg-sky-400 text-white px-6 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-sky-600 transition-all duration-300"
        >
          <PlusCircleIcon className="w-6 h-6" />
          <span className="text-lg font-medium">Create New Province</span>
        </button>
      </div>

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {provinces.map((province) => (
            <div
              key={province.id}
              className="bg-white rounded-lg shadow-md p-4 border border-blue-200 hover:shadow-md hover:shadow-sky-400 duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-sky-600 flex items-center">
                  {province.province_name}
                  <TagIcon className="w-5 h-5 ml-2" />
                </h3>
                <span className="text-sm text-gray-500">ID: {province.id}</span>
              </div>

              <p className="text-sm text-gray-700">
                Number of Routes:{" "}
                <span className="text-lg text-sky-400 font-bold">
                  {province.route_count}
                </span>
              </p>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() =>
                    handleEdit(province.id, province.province_name)
                  }
                  className="bg-yellow-400 text-white px-3 py-2 rounded-md hover:bg-yellow-500 flex items-center duration-300"
                >
                  <PencilSquareIcon className="w-5 h-5 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(province.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 flex items-center duration-300"
                >
                  <TrashIcon className="w-5 h-5 mr-2" />
                  Delete
                </button>
                <button
                  onClick={() => handleViewDetails(province.province_name)}
                  className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 flex items-center duration-300"
                >
                  <ClipboardDocumentListIcon className="w-5 h-5 mr-2" />
                  <span className="mr-2">Routes</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
