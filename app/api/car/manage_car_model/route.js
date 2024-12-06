import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// // Handle GET request to fetch all car brands
// export async function GET() {
//     try {
//         // ดึงข้อมูล car_brand ทั้งหมด
//         const [carBrands] = await pool.query("SELECT id, car_brand_name FROM car_brand");

//         return NextResponse.json(carBrands);
//     } catch (error) {
//         console.error("Error fetching car brands:", error);
//         return NextResponse.json({ error: "Failed to fetch car brands" }, { status: 500 });
//     }
// }

// Handle GET request to fetch all car brands along with car models and images
export async function GET() {
    try {
        // ดึงข้อมูล car_brand ทั้งหมด
        const [carBrands] = await pool.query("SELECT id, car_brand_name FROM car_brand");

        // ดึงข้อมูล car_model และ car_images โดยใช้ JOIN
        const [carBrandsData] = await pool.query(`
            SELECT 
                cm.id AS car_model_id,
                cb.car_brand_name, 
                cm.car_model_name,
                ci.car_images_file
            FROM 
                car_brand cb
            LEFT JOIN car_model cm ON cb.id = cm.car_brand_id
            LEFT JOIN car_images ci ON cm.id = ci.car_model_id
        `);

        // ส่งข้อมูล carBrand และ carBrandsData
        return NextResponse.json({ carBrands, carBrandsData });
    } catch (error) {
        console.error("Error fetching car brands, models, and images:", error);
        return NextResponse.json({ error: "Failed to fetch car brands, models, and images" }, { status: 500 });
    }
}


// Handle POST request to create a new car model
export async function POST(request) {
    try {
        // ดึงข้อมูลจาก request.body และแปลงข้อมูลจาก formData
        const formData = await request.formData();

        const car_brand_id = formData.get("car_brand_id");
        const car_model_name = formData.get("car_model_name");
        const car_images_file = formData.get("car_images_file");

        // ตรวจสอบว่า car_brand_id, car_model_name และ car_images_file ถูกส่งมาหรือไม่
        if (!car_brand_id || !car_model_name || !car_images_file) {
            return NextResponse.json({ error: "Car brand id, model name, and image file are required" }, { status: 400 });
        }

        // สร้างข้อมูล car_model ใหม่
        const [carModelResult] = await pool.query(
            "INSERT INTO car_model (car_brand_id, car_model_name) VALUES (?, ?)",
            [car_brand_id, car_model_name]
        );

        const carModelId = carModelResult.insertId;

        // จัดการการบันทึกไฟล์
        const fileName = `${Date.now()}-${car_images_file.name}`;
        const filePath = path.join(process.cwd(), "public", "uploads", fileName);

        const buffer = Buffer.from(await car_images_file.arrayBuffer());

        // บันทึกไฟล์ลงในระบบ
        fs.writeFileSync(filePath, buffer);

        // สร้างข้อมูล car_images ใหม่ที่เชื่อมโยงกับ car_model
        const [carImagesResult] = await pool.query(
            "INSERT INTO car_images (car_model_id, car_images_file) VALUES (?, ?)",
            [carModelId, fileName]
        );

        return NextResponse.json({ message: "Car model and image created successfully", carModelId, carImageId: carImagesResult.insertId }, { status: 201 });
    } catch (error) {
        console.error("Error creating car model and image:", error);
        return NextResponse.json({ error: "Failed to create car model and image" }, { status: 500 });
    }
}
