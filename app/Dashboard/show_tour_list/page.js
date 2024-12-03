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

  if (loading) {
    return <p>Loading tours...</p>;
  }

  return (
    <div>
      <h1>Tour List</h1>
      {tours.length === 0 ? (
        <p>No tours available.</p>
      ) : (
        <table
          border="1"
          style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Tour Name</th>
              <th>Details</th>
              <th>Section</th>
              <th>Highlights</th>
              <th>Images</th>
              <th>PDF</th>
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
        {/* แสดง Highlights */}
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
        {/* แสดง Images */}
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
              {/* <p>Status: {image.status === "1" ? "Active" : "Inactive"}</p> */}
            </div>
          ))
        ) : (
          "N/A"
        )}
      </td>
      <td>
        {tour.pdf ? (
          <a
            href={`/pdf/${tour.pdf}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View PDF
          </a>
        ) : (
          "N/A"
        )}
      </td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
}
