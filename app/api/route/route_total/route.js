import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
      // ดึงข้อมูล route_detail
      const [routesDetail] = await pool.query(`
          SELECT 
              route_detail.id AS route_detail_id,
              route.route_name,
              province.province_name,
              route_detail.route_detail_name
          FROM route
          JOIN province ON route.province_id = province.id
          LEFT JOIN route_detail ON route.id = route_detail.route_id
      `);

      // ดึงข้อมูล car_model
      const [carBrandsData] = await pool.query(`
          SELECT 
              cm.id AS car_model_id,
              cb.car_brand_name, 
              cm.car_model_name,
              ci.car_images_file
          FROM 
              car_brand cb
          LEFT JOIN car_model cm ON cb.id = cm.car_brand_id
          LEFT JOIN car_images ci ON cm.id = ci.car_model_id
      `);

      // ดึงข้อมูลจาก route_total และข้อมูลที่เกี่ยวข้อง
      const [routeData] = await pool.query(`
          SELECT 
              rt.id AS route_total_id,
              rt.data_price,
              province.province_name,
              route.route_name,
              route_detail.route_detail_name,
              car_model.car_model_name,
              car_brand.car_brand_name,
              car_images.car_images_file
          FROM route_total rt
          LEFT JOIN route_detail ON rt.route_detail_id = route_detail.id
          LEFT JOIN route ON route_detail.route_id = route.id
          LEFT JOIN province ON route.province_id = province.id
          LEFT JOIN car_model ON rt.car_model_id = car_model.id
          LEFT JOIN car_brand ON car_model.car_brand_id = car_brand.id
          LEFT JOIN car_images ON car_model.id = car_images.car_model_id
      `);

      // ส่งข้อมูลให้กับ client
      return NextResponse.json({ routesDetail, carBrandsData, routeData });
  } catch (error) {
      console.error("Error fetching data:", error);
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

// POST Request: สำหรับสร้างข้อมูล route_total
export async function POST(req) {
    try {
        const { route_detail_id, car_model_id, data_price } = await req.json();

        if (!route_detail_id || !car_model_id || !data_price) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Insert ข้อมูลลงใน route_total
        const [result] = await pool.query(`
            INSERT INTO route_total (route_detail_id, car_model_id, data_price)
            VALUES (?, ?, ?)
        `, [route_detail_id, car_model_id, data_price]);

        // ส่งผลลัพธ์กลับไปยัง client
        return NextResponse.json({ message: "Route total created successfully!", id: result.insertId });
    } catch (error) {
        console.error("Error inserting data:", error);
        return NextResponse.json({ error: "Failed to insert data" }, { status: 500 });
    }
}
