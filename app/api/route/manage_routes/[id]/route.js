import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

// Handle PUT request (for editing route)
export async function PUT(req) {
    try {
        const { route_id, route_name, province_id } = await req.json(); // ดึงข้อมูลจาก body

        // ตรวจสอบว่ามีข้อมูลครบหรือไม่
        if (!route_id || !route_name || !province_id) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // อัปเดตข้อมูลเส้นทาง
        const [result] = await pool.query(
            `
            UPDATE route
            SET route_name = ?, province_id = ?
            WHERE id = ?
            `,
            [route_name, province_id, route_id]  // ส่งค่าตัวแปรที่รับจาก body ไปใน query
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: "Route not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Route updated successfully" });
    } catch (error) {
        console.error("Error updating route:", error);
        return NextResponse.json({ error: "Failed to update route" }, { status: 500 });
    }
}

// Handle DELETE request (for deleting route)
export async function DELETE(req) {
  try {
      const { route_id } = await req.json(); // ดึงข้อมูลจาก body

      // ตรวจสอบว่ามี route_id หรือไม่
      if (!route_id) {
          return NextResponse.json({ error: "Missing route_id" }, { status: 400 });
      }

      // ลบเส้นทางที่มี route_id ตรงกัน
      const [result] = await pool.query(
          `
          DELETE FROM route
          WHERE id = ?
          `,
          [route_id]  // ส่ง route_id ที่ต้องการลบ
      );

      if (result.affectedRows === 0) {
          return NextResponse.json({ error: "Route not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "Route deleted successfully" });
  } catch (error) {
      console.error("Error deleting route:", error);
      return NextResponse.json({ error: "Failed to delete route" }, { status: 500 });
  }
}