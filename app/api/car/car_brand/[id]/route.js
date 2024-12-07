// /app/api/car/car_brand/[id]/route.js
import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

// Handle PUT request to update a car brand
export async function PUT(req, { params }) {
    const { id } = params;  // ดึง id จาก params
    const { car_brand_name } = await req.json();  // ดึง car_brand_name จาก request body

    try {
        // ตรวจสอบว่ามีการส่ง car_brand_name มาหรือไม่
        if (!car_brand_name) {
            return NextResponse.json({ error: "Car brand name is required" }, { status: 400 });
        }

        // ทำการอัปเดตข้อมูล car_brand ในฐานข้อมูล
        const [result] = await pool.query(
            "UPDATE car_brand SET car_brand_name = ? WHERE id = ?",
            [car_brand_name, id]
        );

        // ตรวจสอบผลลัพธ์การอัปเดต
        if (result.affectedRows === 0) {
            return NextResponse.json({ error: "Car brand not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Car brand updated successfully" });
    } catch (error) {
        console.error("Error updating car brand:", error);
        return NextResponse.json({ error: "Failed to update car brand" }, { status: 500 });
    }
}

// Handle DELETE request to delete a car brand
export async function DELETE(req, { params }) {
  const { id } = params;  // ดึง id จาก params

  try {
      // ทำการลบ car_brand จากฐานข้อมูล
      const [result] = await pool.query(
          "DELETE FROM car_brand WHERE id = ?",
          [id]
      );

      // ตรวจสอบผลลัพธ์การลบ
      if (result.affectedRows === 0) {
          return NextResponse.json({ error: "Car brand not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "Car brand deleted successfully" });
  } catch (error) {
      console.error("Error deleting car brand:", error);
      return NextResponse.json({ error: "Failed to delete car brand" }, { status: 500 });
  }
}