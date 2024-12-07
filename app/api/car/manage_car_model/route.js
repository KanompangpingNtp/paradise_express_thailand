import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

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


export async function POST(request) {
    try {
        const formData = await request.formData();
        const images = formData.getAll("images[]");
console.log("Uploaded images:", images);

        const car_brand_name = formData.get("car_brand_id"); // รับค่า car_brand_name
        const car_model_name = formData.get("car_model_name");
        const car_images = formData.getAll("images[]"); // รับไฟล์ทั้งหมด

        // ตรวจสอบว่า car_brand_name และ car_model_name ถูกส่งมาหรือไม่
        if (!car_brand_name || !car_model_name) {
            return NextResponse.json(
                { error: "Car brand name and model name are required" },
                { status: 400 }
            );
        }

        // ค้นหา car_brand_id จากชื่อแบรนด์ในตาราง car_brand
        const [carBrandResult] = await pool.query(
            "SELECT id FROM car_brand WHERE car_brand_name = ?",
            [car_brand_name]
        );

        if (carBrandResult.length === 0) {
            return NextResponse.json(
                { error: `Car brand "${car_brand_name}" not found` },
                { status: 400 }
            );
        }

        const car_brand_id = carBrandResult[0].id;

        // สร้างข้อมูล car_model ใหม่
        const [carModelResult] = await pool.query(
            "INSERT INTO car_model (car_brand_id, car_model_name, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
            [car_brand_id, car_model_name]
        );

        const carModelId = carModelResult.insertId;

        // ตรวจสอบว่าโฟลเดอร์ uploads มีอยู่หรือไม่
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // บันทึกไฟล์ภาพ
        const savedImages = [];
        for (const image of car_images) {
            const fileName = `${Date.now()}-${image.name}`;
            const filePath = path.join(uploadDir, fileName);
            const buffer = Buffer.from(await image.arrayBuffer());

            // ตรวจสอบประเภทไฟล์
            if (!image.type.startsWith("image/")) {
                return NextResponse.json(
                    { error: `Invalid file type for ${image.name}` },
                    { status: 400 }
                );
            }

            // บันทึกไฟล์
            fs.writeFileSync(filePath, buffer);

            // บันทึกข้อมูลภาพในตาราง car_images
            const [imageResult] = await pool.query(
                "INSERT INTO car_images (car_model_id, car_images_file, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
                [carModelId, fileName]
            );

            savedImages.push({ id: imageResult.insertId, fileName });
        }

        return NextResponse.json(
            {
                message: "Car model and images created successfully",
                carModelId,
                images: savedImages,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating car model and images:", error);
        return NextResponse.json(
            { error: "Failed to create car model and images", details: error.message },
            { status: 500 }
        );
    }
}