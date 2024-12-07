import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function DELETE(req, { params }) {
  const { id } = params;  // ดึง id จาก URL parameter

  if (!id) {
    return NextResponse.json({ error: "Car model ID is required" }, { status: 400 });
  }

  try {
    // ลบข้อมูล car_images ที่เชื่อมโยงกับ car_model นี้
    const [carImages] = await pool.query("SELECT car_images_file FROM car_images WHERE car_model_id = ?", [id]);

    // ลบไฟล์ที่อยู่ใน public/uploads
    carImages.forEach((image) => {
      const imagePath = path.join(process.cwd(), "public", "uploads", image.car_images_file);

      // ตรวจสอบว่าไฟล์มีอยู่หรือไม่ แล้วลบไฟล์
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);  // ลบไฟล์
      }
    });

    // ลบข้อมูล car_images ที่เกี่ยวข้องกับ car_model นี้
    await pool.query("DELETE FROM car_images WHERE car_model_id = ?", [id]);

    // ลบข้อมูล car_model จากฐานข้อมูล
    const [deleteResult] = await pool.query("DELETE FROM car_model WHERE id = ?", [id]);

    if (deleteResult.affectedRows === 1) {
      return NextResponse.json({ message: "Car model deleted successfully" });
    } else {
      return NextResponse.json({ error: "Car model not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting car model:", error);
    return NextResponse.json({ error: "Failed to delete car model" }, { status: 500 });
  }
}
