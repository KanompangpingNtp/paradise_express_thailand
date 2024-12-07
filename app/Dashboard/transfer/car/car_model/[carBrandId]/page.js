"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import CarModelForm from "./components/CarModelFormModal"; // Import your CarModelForm component
import {
  TrashIcon,
  DocumentIcon,
  XMarkIcon,
  PhotoIcon,
  MapPinIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import Loading from "@/app/components/Loading";

function Carmodel() {
  const { carBrandId } = useParams();
  const decodedcarBrandId = decodeURIComponent(carBrandId);

  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for creating modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ images: [] });

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(
          `/api/car/manage_car_model?carBrandId=${decodedcarBrandId}`
        );
        const data = await response.json();

        if (response.ok) {
          // รวมข้อมูล car_model_id ซ้ำกันและรวม car_images_file
          const uniqueCarModels = data.carBrandsData.reduce((acc, model) => {
            const existingModel = acc.find(
              (item) => item.car_model_id === model.car_model_id
            );

            if (existingModel) {
              // ถ้ามีข้อมูลที่ car_model_id ซ้ำกัน ให้รวม car_images_file
              if (model.car_images_file) {
                existingModel.images.push(model.car_images_file);
              }
            } else {
              // ถ้ายังไม่มีข้อมูลใน accumulator ให้เพิ่มข้อมูลใหม่
              acc.push({
                ...model,
                images: model.car_images_file ? [model.car_images_file] : [],
              });
            }

            return acc;
          }, []);

          setCarData({ ...data, carBrandsData: uniqueCarModels });
          // console.log("Processed car data:", uniqueCarModels);
        } else {
          throw new Error(data.error || "Failed to fetch car data");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching car data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [decodedcarBrandId]);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  const matchedCarBrand = carData?.carBrands.find(
    (brand) => brand.id === parseInt(decodedcarBrandId)
  );

  const filteredCarModels = carData?.carBrandsData.filter(
    (model) =>
      model.car_brand_name === matchedCarBrand?.car_brand_name &&
      model.car_model_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (carModelId) => {
    const model = carData?.carBrandsData.find(
      (m) => m.car_model_id === carModelId
    );
    if (model) {
      setModalData({
        images: model.images, // ส่งอาร์เรย์ของภาพทั้งหมด
      });
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Open modal for creating a new model
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  // Close the modal for creating a new model
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    fetchCarData();
  };
  // console.log("carBrandsData:", carData.carBrandsData);

  const handleDelete = async (carModelId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/car/manage_car_model/${carModelId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // อัพเดตข้อมูลหลังจากลบเสร็จ
          setCarData(prevData => ({
            ...prevData,
            carBrandsData: prevData.carBrandsData.filter(model => model.car_model_id !== carModelId),
          }));
          Swal.fire('Deleted!', 'The car model has been deleted.', 'success');
        } else {
          throw new Error('Failed to delete car model.');
        }
      } catch (error) {
        Swal.fire('Error!', 'There was an issue deleting the car model.', 'error');
      }
    }
  };

  return (
    <div>
      <div className="text-3xl text-center font-bold text-sky-600 flex items-center justify-center mb-10">
        Car Model {matchedCarBrand.car_brand_name}
      </div>

      {matchedCarBrand ? (
        <>
          <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-between my-6 gap-4 lg:gap-6">
            <div className="relative w-full lg:w-auto">
              <input
                type="text"
                placeholder="Search by Name or Highlight..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-md bg-white text-black border border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-4">
                <MagnifyingGlassIcon className="w-6 h-6 text-sky-500" />
              </div>
            </div>
            <button
              className="w-full lg:w-auto bg-sky-400 text-white px-6 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-sky-600 transition-all duration-300"
              onClick={openCreateModal} // Open the modal when clicked
            >
              <PlusCircleIcon className="w-6 h-6" />
              Create New Model
            </button>
          </div>

          {filteredCarModels.length > 0 ? (
            <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
              <thead className="bg-sky-100 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-center uppercase">#</th>
                  <th className="px-4 py-2 text-center uppercase">
                    Model Name
                  </th>
                  <th className="px-4 py-2 text-center uppercase">
                    Brand Name
                  </th>
                  <th className="px-4 py-2 text-center uppercase">Image</th>
                  <th className="px-4 py-2 text-center uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCarModels.map((model, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-center text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 text-center text-gray-600">
                      {model.car_model_name}
                    </td>
                    <td className="px-4 py-2 text-center text-gray-600">
                      {model.car_brand_name}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div
                        onClick={() => openModal(model.car_model_id)} // ใช้ car_model_id แทนการส่งอาร์เรย์ของไฟล์
                        className="flex items-center justify-center text-sky-500 hover:underline cursor-pointer"
                      >
                        <PhotoIcon className="w-5 h-5 text-sky-500 mr-2" />
                        Images
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center">
  <div
    onClick={() => handleDelete(model.car_model_id)} // เรียกฟังก์ชันลบเมื่อคลิก
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
          ) : (
            <p className="text-center text-gray-500 w-full flex justify-center items-center hover:bg-sky-200">
              No models available in this brand.
            </p>
          )}

          {/* Image Modal */}
          {isModalOpen && (
            <Dialog
              open={isModalOpen}
              onClose={closeModal}
              className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
            >
              <div className="bg-white p-6 rounded-lg w-11/12 max-w-4xl relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
                <h3 className="text-2xl font-semibold text-sky-700 mb-4">
                  Car Images
                </h3>
                {modalData.images.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-sky-600 mb-2">Images:</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {modalData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={`/uploads/${image}`}
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
            </Dialog>
          )}

          {/* Create New Model Modal */}
          {isCreateModalOpen && (
            <Dialog
              open={isCreateModalOpen}
              onClose={closeCreateModal}
              className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
            >
              <div className="bg-white p-6 rounded-lg w-auto relative">
                <button
                  onClick={closeCreateModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
                <CarModelForm
                  onClose={() => setIsCreateModalOpen(false)}
                  carBrandName={matchedCarBrand?.car_brand_name} // ส่งค่า car_brand_name ไปยัง CarModelForm
                />
              </div>
            </Dialog>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">Car brand not found.</p>
      )}
    </div>
  );
}

export default Carmodel;
