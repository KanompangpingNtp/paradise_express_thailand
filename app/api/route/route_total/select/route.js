import { pool } from "@/lib/db"; // ตรวจสอบให้ pool ตรงกับการตั้งค่าของคุณ
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // ดึงค่าจาก query params

    // ตรวจสอบว่ามีการส่ง id มา
    if (!id) {
      return new Response("Missing route_total_id in query parameters.", { status: 400 });
    }

    // ดึง route_detail_id ที่ตรงกับ id ที่ส่งมา
    const detailQuery = `
      SELECT route_detail_id
      FROM route_total
      WHERE id = ?
      LIMIT 1
    `;
    const [detailResult] = await pool.query(detailQuery, [id]);

    if (detailResult.length === 0) {
      return new Response("No matching route_total found for the provided id.", { status: 404 });
    }

    const routeDetailId = detailResult[0].route_detail_id; // route_detail_id ที่ได้จากการค้นหา

    // ใช้ route_detail_id เพื่อดึงข้อมูลทั้งหมดที่เกี่ยวข้อง
    const query = `
      SELECT
        rt.id AS route_total_id,
        rt.data_price,
        province.province_name,
        route.route_name,
        route_detail.route_detail_name,
        car_model.car_model_name,
        car_brand.car_brand_name,
        GROUP_CONCAT(car_images.car_images_file ORDER BY car_images.car_images_file) AS car_images_files
      FROM route_total rt
      LEFT JOIN route_detail ON rt.route_detail_id = route_detail.id
      LEFT JOIN route ON route_detail.route_id = route.id
      LEFT JOIN province ON route.province_id = province.id
      LEFT JOIN car_model ON rt.car_model_id = car_model.id
      LEFT JOIN car_brand ON car_model.car_brand_id = car_brand.id
      LEFT JOIN car_images ON car_model.id = car_images.car_model_id
      WHERE rt.route_detail_id = ?  -- ใช้ route_detail_id ที่ได้จากการค้นหา
      GROUP BY rt.id, rt.data_price, province.province_name, route.route_name, route_detail.route_detail_name, car_model.car_model_name, car_brand.car_brand_name
      ORDER BY route.route_name ASC
    `;

    // ดึงข้อมูลทั้งหมดที่เกี่ยวข้อง
    const [routeData] = await pool.query(query, [routeDetailId]);

    if (routeData.length === 0) {
      return new Response("No data found for the selected route_detail_id.", { status: 404 });
    }

    // ส่งกลับข้อมูลที่กรองแล้ว
    return new Response(JSON.stringify({ routeData }), { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Internal Server Error: " + error.message, { status: 500 });
  }
}

