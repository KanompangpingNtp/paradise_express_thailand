import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

// Handle GET request
export async function GET() {
    try {
        // ดึงข้อมูลรูททั้งหมด พร้อมกับชื่อจังหวัดและ province_id
        const [routesWithProvince] = await pool.query(`
            SELECT
                route.id AS route_id,
                route.route_name,
                route.province_id,
                province.province_name
            FROM route
            JOIN province ON route.province_id = province.id
        `);

        // ส่งข้อมูลที่ได้กลับไป
        return NextResponse.json({
            routes: routesWithProvince,  // ข้อมูลรูทที่รวม province_id และ ชื่อจังหวัด
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}



// Handle POST request สำหรับการสร้าง Route ใหม่
export async function POST(req) {
    try {
      const { route_name, province_id } = await req.json(); // รับข้อมูลชื่อ route และ province_id จาก request

      if (!route_name || route_name.trim() === "" || !province_id) {
        return new Response(
          JSON.stringify({ error: "Route name and province_id are required" }),
          { status: 400 }
        );
      }

      // สร้าง route ใหม่ในฐานข้อมูล
      const [result] = await pool.query(
        "INSERT INTO route (route_name, province_id) VALUES (?, ?)",
        [route_name, province_id]
      );

      // ส่งข้อมูลกลับ
      return new Response(
        JSON.stringify({
          id: result.insertId,
          message: "Route created successfully",
        }),
        { status: 201 }
      );
    } catch (error) {
      console.error("Error creating route:", error);
      return new Response(
        JSON.stringify({ error: "Failed to create route" }),
        { status: 500 }
      );
    }
  }
