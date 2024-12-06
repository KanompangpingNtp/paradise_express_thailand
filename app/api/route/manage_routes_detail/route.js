import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

// Handle GET request
export async function GET() {
    try {
        // ดึงข้อมูล route พร้อมกับ province_name
        const [routes] = await pool.query(`
            SELECT 
                route.id AS route_id,
                route.route_name,
                province.province_name
            FROM route
            JOIN province ON route.province_id = province.id
        `);

        // ดึงข้อมูล route_detail พร้อมกับ route_name และ province_name
        const [routes_detail] = await pool.query(`
            SELECT 
                route_detail.id AS route_detail_id,
                route.route_name,
                province.province_name,
                route_detail.route_detail_name
            FROM route
            JOIN province ON route.province_id = province.id
            LEFT JOIN route_detail ON route.id = route_detail.route_id
        `);

        // ส่งกลับข้อมูลทั้งสอง
        return NextResponse.json({ routes, routes_detail });
    } catch (error) {
        console.error("Error fetching routes:", error);
        return NextResponse.json({ error: "Failed to fetch routes" }, { status: 500 });
    }
}

// Handle POST request to create new route detail
export async function POST(request) {
    try {
        const { route_id, route_detail_name } = await request.json();

        // ตรวจสอบข้อมูลที่ได้รับมา
        if (!route_id || !route_detail_name) {
            return NextResponse.json({ error: "route_id and route_detail_name are required" }, { status: 400 });
        }

        // Insert ข้อมูลใหม่ลงใน table route_detail
        const [result] = await pool.query(`
            INSERT INTO route_detail (route_id, route_detail_name)
            VALUES (?, ?)
        `, [route_id, route_detail_name]);

        // ตรวจสอบการ insert 
        if (result.affectedRows > 0) {
            return NextResponse.json({
                message: "Route detail created successfully",
                route_detail_id: result.insertId, // ส่งกลับ ID ของข้อมูลที่สร้าง
            }, { status: 201 });
        } else {
            return NextResponse.json({ error: "Failed to create route detail" }, { status: 500 });
        }

    } catch (error) {
        console.error("Error creating route detail:", error);
        return NextResponse.json({ error: "Failed to create route detail" }, { status: 500 });
    }
}