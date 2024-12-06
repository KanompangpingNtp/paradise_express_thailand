import { pool } from "@/lib/db"; 
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
      // ดึงข้อมูลจากตาราง route และ car_brand
      const [routeRows] = await pool.query("SELECT id, route_name FROM route");
      const [carBrandRows] = await pool.query("SELECT id, car_brand_name FROM car_brand");
  
      // ส่งข้อมูลกลับ
      return NextResponse.json({
        routes: routeRows,
        carBrands: carBrandRows,
      });
    } catch (error) {
      console.error("Error fetching route and car brand data:", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }

  export async function POST(req) {
    try {
      // รับข้อมูล JSON จาก request
      const body = await req.json();
      const { route_id, car_brand_id, route_detail_name, price } = body;
  
      // ตรวจสอบข้อมูลที่ได้รับ
      if (!route_id || !car_brand_id || !route_detail_name || price === undefined) {
        return new Response(
          JSON.stringify({ message: "Missing required fields: route_id, car_brand_id, route_detail_name, or price" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
  
      // เริ่มต้น transaction
      await pool.query("START TRANSACTION");
  
      // Insert ข้อมูลใหม่ลงใน route_detail
      const [result] = await pool.query(
        "INSERT INTO route_detail (route_id, car_brand_id, route_detail_name) VALUES (?, ?, ?)",
        [route_id, car_brand_id, route_detail_name]
      );
  
      const route_detail_id = result.insertId;
  
      // Insert ข้อมูลใน data_price
      await pool.query(
        "INSERT INTO data_price (route_detail_id, price) VALUES (?, ?)",
        [route_detail_id, price]
      );
  
      // ทำการ commit transaction
      await pool.query("COMMIT");
  
      return new Response(
        JSON.stringify({ message: "Route detail and price created successfully", route_detail_id, price }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      // ทำการ rollback ถ้ามีข้อผิดพลาด
      await pool.query("ROLLBACK");
  
      console.error("Error inserting route detail and price:", error);
      return new Response(
        JSON.stringify({ message: "Internal server error", error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  