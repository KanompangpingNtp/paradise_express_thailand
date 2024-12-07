import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

// DELETE request เพื่อทำการลบ
export async function DELETE(request, { params }) {
  const { id } = params; // รับ id จาก params

  try {
    // ลบข้อมูลในตาราง
    const [result] = await pool.query("DELETE FROM province WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Province not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Province deleted successfully" });
  } catch (error) {
    console.error("Error deleting province:", error);
    return NextResponse.json(
      { error: "Failed to delete province" },
      { status: 500 }
    );
  }
}

// Handle PUT request สำหรับการแก้ไขจังหวัด
export async function PUT(request, { params }) {
  const { id } = params; // รับ id จาก params

  try {
    // รับข้อมูลจาก body
    const { province_name } = await request.json();

    // ตรวจสอบว่า province_name มีการส่งมาหรือไม่
    if (!province_name) {
      return NextResponse.json(
        { error: "Province name is required" },
        { status: 400 }
      );
    }

    // อัพเดทข้อมูลจังหวัดในฐานข้อมูล
    const [result] = await pool.query(
      "UPDATE province SET province_name = ? WHERE id = ?",
      [province_name, id]
    );

    // หากไม่มีแถวที่ถูกอัพเดท (ไม่พบจังหวัดที่มี id นี้)
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Province not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Province updated successfully" });
  } catch (error) {
    console.error("Error updating province:", error);
    return NextResponse.json(
      { error: "Failed to update province" },
      { status: 500 }
    );
  }
}
