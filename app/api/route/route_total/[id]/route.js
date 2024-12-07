import { pool } from "@/lib/db"; // ตรวจสอบให้ pool ตรงกับการตั้งค่าของคุณ
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = params; // ดึงพารามิเตอร์ id จาก URL

  try {
    // ลบข้อมูลจากฐานข้อมูล
    const [result] = await pool.query(
      "DELETE FROM route_total WHERE id = ?",
      [id]
    );

    // ตรวจสอบว่าพบข้อมูลที่ต้องลบหรือไม่
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "No record found to delete" },
        { status: 404 }
      );
    }

    // ส่ง Response สำเร็จ
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    return NextResponse.json(
      { message: "Failed to delete data", error: error.message },
      { status: 500 }
    );
  }
}
