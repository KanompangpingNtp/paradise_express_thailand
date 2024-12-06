import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

// Handle GET request
export async function GET() {
    try {
        // ดึงข้อมูลจังหวัดทั้งหมด
        const [provinces] = await pool.query("SELECT id, province_name FROM province");

        // ดึงข้อมูลรูททั้งหมด
        const [routes] = await pool.query(`
            SELECT 
                route.id AS route_id,
                route.route_name,
                province.province_name
            FROM route
            JOIN province ON route.province_id = province.id
        `);

        // ส่งข้อมูลรวมกลับไป
        return NextResponse.json({
            provinces, // ข้อมูลจังหวัดสำหรับ select option
            routes,    // ข้อมูลรูทที่สร้างแล้ว
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}


// Handle POST request
export async function POST(request) {
    try {
        // รับข้อมูลจาก Body
        const { province_id, route_name } = await request.json();

        // ตรวจสอบข้อมูล
        if (!province_id || !route_name) {
            return NextResponse.json(
                { error: "Province ID and Route Name are required" },
                { status: 400 }
            );
        }

        // เพิ่มข้อมูลในตาราง route
        const [result] = await pool.query(
            "INSERT INTO route (province_id, route_name) VALUES (?, ?)",
            [province_id, route_name]
        );

        return NextResponse.json({
            id: result.insertId,
            province_id,
            route_name,
            message: "Route created successfully",
        });
    } catch (error) {
        console.error("Error creating route:", error);
        return NextResponse.json({ error: "Failed to create route" }, { status: 500 });
    }
}
