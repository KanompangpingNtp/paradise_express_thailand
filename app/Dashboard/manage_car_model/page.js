'use client';

import React, { useState, useEffect } from 'react';

export default function ManageCarModel() {
    const [carBrands, setCarBrands] = useState([]);
    const [carModelName, setCarModelName] = useState('');
    const [carBrandId, setCarBrandId] = useState('');
    const [carImage, setCarImage] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // for loading state

    // useEffect(() => {
    //     const fetchCarBrands = async () => {
    //         try {
    //             const response = await fetch('/api/car/manage_car_model');
    //             const data = await response.json();
    //             setCarBrands(data);
    //         } catch (error) {
    //             setMessage('Failed to fetch car brands');
    //         }
    //     };

    //     fetchCarBrands();
    // }, []);
    useEffect(() => {
        const fetchCarBrands = async () => {
            try {
                const response = await fetch('/api/car/manage_car_model');
                const data = await response.json();

                // ตรวจสอบว่า data.carBrands เป็น array
                if (Array.isArray(data.carBrands)) {
                    setCarBrands(data.carBrands);
                } else {
                    setMessage('Invalid data format for car brands');
                }
            } catch (error) {
                setMessage('Failed to fetch car brands');
            }
        };

        fetchCarBrands();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form data
        if (!carBrandId || !carModelName || !carImage) {
            setMessage("All fields are required!");
            return;
        }

        setLoading(true);
        setMessage('');

        const formData = new FormData();
        formData.append('car_brand_id', carBrandId);
        formData.append('car_model_name', carModelName);
        formData.append('car_images_file', carImage);

        try {
            const response = await fetch('/api/car/manage_car_model', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Car model and image created successfully!');
            } else {
                setMessage(result.error || 'Failed to create car model and image.');
            }
        } catch (error) {
            setMessage('An error occurred while submitting the form.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Create Car Model</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="carBrandId">Car Brand</label>
                    {/* <select
                        id="carBrandId"
                        value={carBrandId}
                        onChange={(e) => setCarBrandId(e.target.value)}
                        style={{ color: 'white' }}
                    >
                        <option value="">Select a brand</option>
                        {carBrands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.car_brand_name}
                            </option>
                        ))}
                    </select> */}
                    <select
                        id="carBrandId"
                        value={carBrandId}
                        onChange={(e) => setCarBrandId(e.target.value)}
                        style={{ color: 'white' }}
                    >
                        <option value="">Select a brand</option>
                        {carBrands && carBrands.length > 0 ? (
                            carBrands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.car_brand_name}
                                </option>
                            ))
                        ) : (
                            <option value="">No car brands available</option>
                        )}
                    </select>

                </div>

                <div>
                    <label htmlFor="carModelName">Car Model Name</label>
                    <input
                        type="text"
                        id="carModelName"
                        value={carModelName}
                        onChange={(e) => setCarModelName(e.target.value)}
                        style={{ color: 'white' }}
                    />
                </div>

                <div>
                    <label htmlFor="carImagesFile">Car Image</label>
                    <input
                        type="file"
                        id="carImagesFile"
                        accept="image/*"
                        onChange={(e) => setCarImage(e.target.files[0])}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Creating...' : 'Create Car Model'}
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}
