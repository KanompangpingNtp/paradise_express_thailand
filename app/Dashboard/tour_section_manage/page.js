"use client";

import { useEffect, useState } from "react";

export default function TourSectionManage() {
    const [tourSections, setTourSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [newTourSectionName, setNewTourSectionName] = useState("");
    const [formError, setFormError] = useState(null);
    const [formSuccess, setFormSuccess] = useState(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editTourSectionName, setEditTourSectionName] = useState("");

    useEffect(() => {
        fetchTourSections();
    }, []);

    const fetchTourSections = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/tours_section");
            const data = await response.json();

            if (data.success) {
                setTourSections(data.data); // เก็บข้อมูลที่ได้รับจาก API
            } else {
                throw new Error(data.message || "Failed to fetch data");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!newTourSectionName.trim()) {
            setFormError("Tour section name is required");
            return;
        }

        try {
            const response = await fetch("/api/tours_section", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tour_section_name: newTourSectionName }),
            });

            const data = await response.json();

            if (data.success) {
                setFormSuccess("Tour section created successfully");
                setNewTourSectionName("");
                setFormError(null);
                fetchTourSections(); // Refresh the table
            } else {
                throw new Error(data.message || "Failed to create tour section");
            }
        } catch (err) {
            setFormError(err.message);
        }
    };

    const openEditModal = (id, currentName) => {
        setEditId(id);
        setEditTourSectionName(currentName);
        setIsEditModalOpen(true);
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        if (!editTourSectionName.trim()) {
            setFormError("Tour section name is required");
            return;
        }

        if (!editId) {
            setFormError("Tour section ID is missing");
            return;
        }

        try {
            // ส่งคำขอ PUT ไปที่ API
            const response = await fetch(`/api/tours_section/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tour_section_name: editTourSectionName }),
            });

            if (!response.ok) {
                // หากเกิดข้อผิดพลาดจากเซิร์ฟเวอร์
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update tour section");
            }

            const data = await response.json(); // รับข้อมูล JSON

            if (data.success) {
                setIsEditModalOpen(false);
                setEditId(null);
                setEditTourSectionName(""); // ล้างข้อมูลในฟอร์ม
                fetchTourSections(); // รีเฟรชตารางข้อมูล
            } else {
                throw new Error(data.message || "Failed to update tour section");
            }
        } catch (err) {
            setFormError(err.message); // แสดงข้อความข้อผิดพลาด
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this tour section?")) {
            try {
                const response = await fetch(`/api/tours_section/${id}`, {
                    method: "DELETE",
                });
    
                if (!response.ok) {
                    throw new Error("Failed to delete tour section");
                }
    
                const data = await response.json();
                if (data.success) {
                    fetchTourSections(); // รีเฟรชข้อมูลตารางหลังจากลบ
                } else {
                    throw new Error(data.message || "Failed to delete tour section");
                }
            } catch (err) {
                alert(err.message); // แสดงข้อความข้อผิดพลาด
            }
        }
    };
    
    return (
        <div className="container mx-auto p-4">
            {/* ฟอร์มสำหรับสร้างข้อมูลใหม่ */}
            <form onSubmit={handleCreate} className="mb-6">
                <h2 className="mt-20 text-xl font-bold mb-5 text-center">Tour Section Management</h2>

                {formError && <p className="text-red-500 mb-2">{formError}</p>}
                {formSuccess && <p className="text-green-500 mb-2">{formSuccess}</p>}

                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Enter tour section name"
                        value={newTourSectionName}
                        onChange={(e) => setNewTourSectionName(e.target.value)}
                        className="border rounded-md px-4 py-2 w-50"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Create
                    </button>
                </div>
            </form>

            {/* ตารางแสดงข้อมูล */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Tour Section Name</th>
                            <th className="py-2 px-4 border-b">Created At</th>
                            <th className="py-2 px-4 border-b">Updated At</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tourSections.length > 0 ? (
                            tourSections.map((section) => (
                                <tr key={section.id}>
                                    <td className="py-2 px-4 border-b text-center">{section.id}</td>
                                    <td className="py-2 px-4 border-b">{section.tour_section_name}</td>
                                    <td className="py-2 px-4 border-b">{new Date(section.created_at).toLocaleString()}</td>
                                    <td className="py-2 px-4 border-b">{new Date(section.updated_at).toLocaleString()}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <button
                                            onClick={() => openEditModal(section.id, section.tour_section_name)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(section.id)}
                                            className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-4 text-center text-gray-500">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* Modal สำหรับแก้ไข */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-md p-6 shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Edit Tour Section</h2>

                        <form onSubmit={handleEdit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Tour Section Name</label>
                                <input
                                    type="text"
                                    value={editTourSectionName}
                                    onChange={(e) => setEditTourSectionName(e.target.value)}
                                    className="border rounded-md px-4 py-2 w-full"
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}