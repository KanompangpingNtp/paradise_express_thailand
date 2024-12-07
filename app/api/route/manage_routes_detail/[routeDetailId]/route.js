import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { routeDetailId } = params; // ดึง routeDetailId จาก URL
  console.log(routeDetailId)
  try {
    // ตรวจสอบว่า routeDetailId มีค่า
    if (!routeDetailId) {
      return NextResponse.json(
        { error: "Route detail ID is required." },
        { status: 400 }
      );
    }

    // ลบข้อมูลจาก database
    const [result] = await pool.query(
      "DELETE FROM route_detail WHERE id = ?",
      [routeDetailId]
    );

    if (result.affectedRows > 0) {
      return NextResponse.json(
        { message: "Route detail deleted successfully." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Route detail not found or already deleted." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting route detail:", error);
    return NextResponse.json(
      { error: "Failed to delete route detail." },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { routeDetailId } = params; // ดึง routeDetailId จาก URL

  try {
    const { route_detail_name } = await request.json(); // อ่านข้อมูลจาก body

    // ตรวจสอบข้อมูล
    if (!routeDetailId || !route_detail_name) {
      return NextResponse.json(
        { error: "Route detail ID and name are required." },
        { status: 400 }
      );
    }

    // อัปเดตข้อมูลใน database
    const [result] = await pool.query(
      "UPDATE route_detail SET route_detail_name = ? WHERE id = ?",
      [route_detail_name, routeDetailId]
    );

    if (result.affectedRows > 0) {
      return NextResponse.json(
        { message: "Route detail updated successfully." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Route detail not found or no changes made." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error updating route detail:", error);
    return NextResponse.json(
      { error: "Failed to update route detail." },
      { status: 500 }
    );
  }
}