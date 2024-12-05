"use client";

import { useEffect, useState } from "react";
import {
  TrashIcon,
  DocumentIcon,
  XMarkIcon,
  PhotoIcon,
  MapPinIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { Dialog } from "@headlessui/react";
import { useParams } from "next/navigation"; // ใช้ useParams สำหรับดึงข้อมูลจาก params
import Image from "next/image"; // นำเข้า Image จาก Next.js
import Loading from "@/app/components/Loading";
import TourForm from "../../components/TourFrom";

export default function ShowTourList() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tour_section_name } = useParams(); // ใช้ useParams เพื่อดึงค่าจาก params
  const decodedTourSectionName = decodeURIComponent(tour_section_name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ highlights: [], images: [] });
  const [isModalOpenForm, setIsModalOpenForm] = useState(false);

  // ฟังก์ชันสำหรับดึงข้อมูล Tours
  const fetchTours = async () => {
    try {
      const res = await fetch("/api/tours/tours_data");
      const data = await res.json();
      if (data.success) {
        setTours(data.tours);
      } else {
        console.error("Failed to fetch tours:", data.message);
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const deleteTour = async (tourId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/tours/${tourId}`, {
            method: "DELETE",
          });

          const data = await res.json();
          if (data.success) {
            setTours(tours.filter((tour) => tour.tour_id !== tourId));
            Swal.fire("Deleted!", "Your tour has been deleted.", "success");
          } else {
            Swal.fire("Error", "Failed to delete tour", "error");
          }
        } catch (error) {
          console.error("Error deleting tour:", error);
          Swal.fire(
            "Error",
            "An error occurred while deleting the tour",
            "error"
          );
        }
      }
    });
  };

  const openModal = (highlights, images, detail) => {
    setModalData({ highlights, images, detail });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // ฟังก์ชันสำหรับเปิด modal
  const openModalForm = () => {
    setIsModalOpenForm(true);
  };

  // ฟังก์ชันสำหรับปิด modal
  const closeModalForm = () => {
    setIsModalOpenForm(false);
  };

  // ฟังก์ชันสำหรับการ submit form
  const handleFormSubmit = (isSuccess) => {
    if (isSuccess) {
      Swal.fire({
        title: "Tour Created Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        closeModalForm(); // ปิด modal หลังจากแสดง SweetAlert
        fetchTours();
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "There was an issue creating the tour. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        closeModalForm();
        fetchTours();
      });
    }
  };

  if (loading) return <Loading />;

  const filteredTours = tours.filter(
    (tour) => tour.section_name === decodedTourSectionName
  );

  return (
    <div>
      {/* แสดง Tour Section Details for */}
      <div className="text-3xl text-center font-bold text-sky-600 flex items-center justify-center mb-10">
        <ClipboardDocumentListIcon className="w-8 h-8 mr-2" />
        Tour list of Section {decodedTourSectionName}
      </div>

      {/* ปุ่มเพื่อเปิด Modal */}
      <div  className="w-full flex justify-center lg:justify-end my-6">
        <button
        onClick={openModalForm}
          className="w-full lg:w-auto bg-sky-400 text-white px-6 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-sky-600 transition-all duration-300"
        >
          <PlusCircleIcon className="w-6 h-6" />
          <span className="text-lg font-medium">Create Tour</span>
        </button>
      </div>

      {/* ตารางแสดงข้อมูล */}
      {filteredTours.length === 0 ? (
        <p className="text-center text-gray-500 w-full flex justify-center items-center hover:bg-sky-200">
          No tours available in this section.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-sky-100 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-center uppercase">#</th>
                <th className="px-4 py-2 text-center uppercase">Tour Name</th>
                <th className="px-4 py-2 text-center uppercase">Details</th>
                <th className="px-4 py-2 text-center uppercase">Highlights</th>
                <th className="px-4 py-2 text-center uppercase">Images</th>
                <th className="px-4 py-2 text-center uppercase">PDF</th>
                <th className="px-4 py-2 text-center uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.map((tour, index) => (
                <tr key={tour.tour_id} className="border-b hover:bg-sky-50">
                  <td className="px-4 py-2 text-center text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-600">
                    {tour.name}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div
                      onClick={() => openModal([], [], tour.detail)} // เพิ่มข้อมูล detail ไปที่ modal
                      className="flex items-center justify-center text-sky-500 hover:underline cursor-pointer"
                    >
                      <DocumentIcon className="w-5 h-5 text-sky-500 mr-2" />
                      Details
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div
                      onClick={() => openModal(tour.highlights, [])}
                      className="flex items-center justify-center text-sky-500 hover:underline cursor-pointer"
                    >
                      <MapPinIcon className="w-5 h-5 text-sky-500 mr-2" />
                      Highlights
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div
                      onClick={() => openModal([], tour.images)}
                      className="flex items-center justify-center text-sky-500 hover:underline cursor-pointer"
                    >
                      <PhotoIcon className="w-5 h-5 text-sky-500 mr-2" />
                      Images
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    {tour.pdf ? (
                      <a
                        href={`/pdf/${tour.pdf}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center text-sky-500 hover:underline"
                      >
                        <DocumentIcon className="w-5 h-5 text-sky-500 mr-2" />
                        PDF
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div
                      onClick={() => deleteTour(tour.tour_id)}
                      className="flex items-center justify-center text-red-500 px-4 py-2 rounded-lg hover:underline duration-300 cursor-pointer"
                    >
                      <TrashIcon className="w-5 h-5 mr-2" />
                      Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal TourForm*/}
      {isModalOpenForm && (
        <Dialog open={isModalOpenForm} onClose={closeModalForm}>
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-5 rounded-lg relative lg:w-1/3">
              <button
                onClick={closeModalForm}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <TourForm onSubmit={handleFormSubmit} section={decodedTourSectionName}/>
            </div>
          </div>
        </Dialog>
      )}

      {/* Modal for Highlights and Images */}
      {isModalOpen && (
        <Dialog open={isModalOpen} onClose={closeModal}>
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-11/12 max-w-4xl relative">
              {/* ปุ่มปิดอยู่ภายใน Modal */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-semibold text-sky-700 mb-4">
                Tour Information
              </h3>
              {/* แสดงข้อมูล Detail */}
              {modalData.detail && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sky-600 mb-2">Details:</h4>
                  <p>{modalData.detail}</p>
                </div>
              )}

              {/* Modal for Highlights */}
              {modalData.highlights.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sky-600 mb-2">
                    Highlights:
                  </h4>
                  <ul className="list-disc pl-5">
                    {modalData.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Modal for Images */}
              {modalData.images.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-sky-600 mb-2">Images:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {modalData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={`/uploads/${image.file}`}
                          alt={`Image ${index + 1}`}
                          width={500}
                          height={500}
                          className="w-full h-auto object-cover rounded-md max-h-64"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
