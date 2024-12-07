"use client"
import React, { useEffect, useState } from 'react';
import CarSlider from '@/app/components/SliderCar/page';
import LoadingFornt from '@/app/components/LoadingFornt';

const CarRentalPage = () => {
  const [routeData, setRouteData] = useState([]);

  // ฟังก์ชันในการดึงข้อมูล
  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const response = await fetch('/api/route/route_total');
        const data = await response.json();
        setRouteData(data.routeData); // เก็บเฉพาะ routeData
      } catch (error) {
        console.error('Error fetching route data:', error);
      }
    };

    fetchRouteData();
  }, []);

  // หากยังโหลดข้อมูลไม่เสร็จให้แสดงข้อความ
  if (routeData.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingFornt/>
      </div>
    );
  }


  // สร้าง carData โดยใช้ข้อมูลจาก routeData
  const carData = routeData.map((route) => {
    const carImages = route.car_images_files ? route.car_images_files.split(",") : ["default-image.jpg"];
    return {
      id: route.route_total_id || "unknown-id",
      name: route.route_name || "ไม่ระบุชื่อ",
      pricePerDay: route.data_price || "ไม่ระบุ",
      image: carImages[0],
      description: route.route_detail_name || "ไม่มีคำบรรยาย",
      features: [route.car_brand_name || "ไม่ระบุจังหวัด", route.car_model_name  || "ไม่ระบุเส้นทาง"],
    };
  });

  return <CarSlider cars={carData} />;
};

export default CarRentalPage;
