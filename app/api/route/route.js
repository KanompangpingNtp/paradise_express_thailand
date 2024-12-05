import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req) {
    try {
      // Query ดึงข้อมูลจากฐานข้อมูล
      const [rows] = await pool.query(`
        SELECT 
          province.province_name,
          route.route_name
        FROM 
          province
        LEFT JOIN 
          route ON province.id = route.province_id
      `);
  
      return NextResponse.json(rows);
    } catch (error) {
      console.error("Error fetching route data:", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }
  

export async function POST(req) {
    try {
      // รับข้อมูล JSON จาก Request
      const body = await req.json();
  
      const { province_name, route_name, route_detail_name, car_brand_id } = body;
  
      // ตรวจสอบว่า province_name และ route_name ถูกส่งมาหรือไม่
      if (!province_name || !route_name) {
        return NextResponse.json(
          { message: "Missing required fields: province_name or route_name" },
          { status: 400 }
        );
      }
  
      // เริ่มกระบวนการ Insert ข้อมูล Province ใหม่
      const [provinceResult] = await pool.query("INSERT INTO province (province_name) VALUES (?)", [
        province_name,
      ]);
  
      const province_id = provinceResult.insertId;  // province_id ที่ถูกสร้างอัตโนมัติจากการ insert
  
      // เริ่มกระบวนการ Insert ข้อมูล Route
      const [routeResult] = await pool.query("INSERT INTO route (province_id, route_name) VALUES (?, ?)", [
        province_id,
        route_name,
      ]);
  
      const route_id = routeResult.insertId;  // route_id ที่ถูกสร้างอัตโนมัติจากการ insert
  
      // ตรวจสอบว่า route_detail_name ถูกส่งมาหรือไม่
      if (route_detail_name) {
        // ถ้า route_detail_name ถูกส่งมา, ให้ insert ข้อมูล Route Detail
        await pool.query("INSERT INTO route_detail (route_id, car_brand_id, route_detail_name) VALUES (?, ?, ?)", [
          route_id,
          car_brand_id || null,  // car_brand_id ใช้ค่า null ถ้าไม่ได้ส่งมา
          route_detail_name,
        ]);
      }
  
      return NextResponse.json({ message: "Data successfully inserted" }, { status: 201 });
    } catch (error) {
      console.error("Error inserting data:", error);
      return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
  }