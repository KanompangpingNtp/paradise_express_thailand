import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

// GET ดึงข้อมูลทั้งหมดจาก route_detail พร้อมกับข้อมูลจากตารางที่เกี่ยวข้อง
export async function GET(req) {
    try {
      const [rows] = await pool.query(`
        SELECT 
          -- ข้อมูลจาก province
          province.id AS province_id,
          province.province_name,
  
          -- ข้อมูลจาก route
          route.id AS route_id,
          route.route_name,
  
          -- ข้อมูลจาก route_detail
          route_detail.id AS route_detail_id,
          route_detail.route_detail_name,
          
          -- ข้อมูลจาก car_brand
          car_brand.id AS car_brand_id,
          car_brand.car_brand_name,
          
          -- ข้อมูลจาก car_model
          car_model.id AS car_model_id,
          car_model.car_model_name,
          
          -- ข้อมูลจาก data_price
          data_price.id AS data_price_id,
          data_price.price
          
        FROM route_detail
        -- การ JOIN ตารางที่เกี่ยวข้อง
        LEFT JOIN route ON route_detail.route_id = route.id
        LEFT JOIN car_brand ON route_detail.car_brand_id = car_brand.id
        LEFT JOIN province ON route.province_id = province.id
        LEFT JOIN car_model ON car_brand.id = car_model.car_brand_id
        LEFT JOIN data_price ON route_detail.id = data_price.route_detail_id
        
        -- การจัดลำดับข้อมูล (ORDER BY)
        ORDER BY province_id ASC, route_id ASC, route_detail_id ASC
      `);
  
      return NextResponse.json(rows);
    } catch (error) {
      console.error("Error fetching route details:", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }
  
