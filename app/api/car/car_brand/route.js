import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

// Handle GET request to fetch all car brands
export async function GET() {
    try {
        // ดึงข้อมูล car_brand ทั้งหมด
        const [carBrands] = await pool.query("SELECT id, car_brand_name FROM car_brand");

        return NextResponse.json(carBrands);
    } catch (error) {
        console.error("Error fetching car brands:", error);
        return NextResponse.json({ error: "Failed to fetch car brands" }, { status: 500 });
    }
}

// Handle POST request to create a new car brand
export async function POST(request) {
    try {
        const { car_brand_name } = await request.json(); // ดึงข้อมูล car_brand_name จาก request body

        // ตรวจสอบว่า car_brand_name ถูกส่งมาหรือไม่
        if (!car_brand_name) {
            return NextResponse.json({ error: "Car brand name is required" }, { status: 400 });
        }

        // สร้างข้อมูลใหม่ในตาราง car_brand
        const [result] = await pool.query(
            "INSERT INTO car_brand (car_brand_name) VALUES (?)",
            [car_brand_name]
        );

        return NextResponse.json({ message: "Car brand created successfully", id: result.insertId }, { status: 201 });
    } catch (error) {
        console.error("Error creating car brand:", error);
        return NextResponse.json({ error: "Failed to create car brand" }, { status: 500 });
    }
}
