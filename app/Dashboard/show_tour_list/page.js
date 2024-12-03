"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ShowTourList() {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        fetchTours();
    }, []);

    const deleteTour = async (tourId) => {
        if (confirm("Are you sure you want to delete this tour?")) {
            try {
                const res = await fetch(`/api/tours/${tourId}`, {
                    method: "DELETE",
                });

                const data = await res.json();
                if (data.success) {
                    // Remove the deleted tour from the list
                    setTours(tours.filter((tour) => tour.tour_id !== tourId));
                } else {
                    console.error("Failed to delete tour:", data.message);
                }
            } catch (error) {
                console.error("Error deleting tour:", error);
            }
        }
    };

    if (loading) {
        return <p>Loading tours...</p>;
    }

    return (
        <div>
            <br />
            <h1 className="text-center text-xl">Tour List</h1>
            <br />
            {tours.length === 0 ? (
                <p>No tours available.</p>
            ) : (
                <table
                    border="1"
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        textAlign: "left",
                        marginLeft: "45px",
                        marginRight: "45px",
                    }}
                >
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Tour Name</th>
                            <th>Details</th>
                            <th>Section</th>
                            <th>Highlights</th>
                            <th>Images</th>
                            <th>PDF</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tours.map((tour, index) => (
                            <tr key={tour.tour_id}>
                                <td>{index + 1}</td>
                                <td>{tour.name}</td>
                                <td>{tour.detail}</td>
                                <td>{tour.section_name}</td>
                                <td>
                                    {tour.highlights && tour.highlights.length > 0 ? (
                                        <ul>
                                            {tour.highlights.map((highlight, hIndex) => (
                                                <li key={hIndex}>{highlight}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td>
                                    {tour.images && tour.images.length > 0 ? (
                                        tour.images.map((image, imgIndex) => (
                                            <div key={imgIndex} style={{ marginBottom: "5px" }}>
                                                <Image
                                                    src={`/uploads/${image.file}`}
                                                    alt={`Image ${imgIndex + 1}`}
                                                    width={50}
                                                    height={50}
                                                    style={{ borderRadius: "5px" }}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td>
                                    {tour.pdf ? (
                                        <a href={`/pdf/${tour.pdf}`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                            {/* ไอคอน SVG */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                            </svg>
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => deleteTour(tour.tour_id)}
                                        style={{
                                            backgroundColor: "red",
                                            color: "white",
                                            padding: "5px 10px",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
