"use client"
import React from 'react';
import CarSlider from '@/app/components/SliderCar/page';

const CarRentalPage = () => {
  const carData = [
    {
      id: 1,
      name: 'Porsche 911 Carrera',
      year: 2024,
      pricePerDay: 500,
      transmission: 'PDK Automatic',
      fuelType: 'Gasoline',
      image: '/images/03.jpg',
      description: 'ประสิทธิภาพสูง ดีไซน์คลาสสิก ความเป็นสปอร์ตระดับโลก',
      features: ['เครื่องยนต์ 3.0L Twin-Turbo', 'ความเร็วสูงสุด 293 กม./ชม.', 'เร่ง 0-100 กม./ชม. ใน 3.4 วินาที']
    },
    {
      id: 2,
      name: 'Mercedes-AMG GT',
      year: 2023,
      pricePerDay: 450,
      transmission: 'Automatic',
      fuelType: 'Hybrid Performance',
      image: '/images/02.jpg',
      description: 'นวัตกรรมแห่งความทรงพลัง สมรรถนะเหนือระดับ',
      features: ['เครื่องยนต์ 4.0L V8', 'ระบบไฮบริดสมรรถนะสูง', 'การออกแบบแบบ Aerodynamic']
    },
    {
      id: 3,
      name: 'BMW M4 Competition',
      year: 2024,
      pricePerDay: 420,
      transmission: 'M Sport Automatic',
      fuelType: 'High-Performance Gasoline',
      image: '/images/01.jpg',
      description: 'ความทรงพลังแห่งวิศวกรรมยานยนต์ สไตล์สปอร์ตสุดคม',
      features: ['เครื่องยนต์ 3.0L Inline-6', 'ระบบขับเคลื่อน M xDrive', 'น้ำหนักเบาด้วยวัสดุคาร์บอน']
    }
  ];


  return <CarSlider cars={carData} />;
};

export default CarRentalPage;
