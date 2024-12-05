import { pool } from "@/lib/db"; 

export async function GET(req) {
  try {
    // Query ดึงข้อมูลจากฐานข้อมูล
    const [rows] = await pool.query(`
      SELECT 
        car_brand.id AS car_brand_id,
        car_brand.car_brand_name,
        car_model.car_model_name,
        car_images.car_images_file
      FROM 
        car_brand
      LEFT JOIN 
        car_model ON car_brand.id = car_model.car_brand_id
      LEFT JOIN 
        car_images ON car_model.id = car_images.car_model_id
    `);

    console.log("Data fetched successfully:", rows);

    // ส่งข้อมูลกลับในรูปแบบ JSON
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching car data:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// export async function POST(req) {
//     try {
//       // รับข้อมูล JSON จาก Request
//       const body = await req.json();
  
//       const { car_brand_name, car_model_name, car_images_file } = body;
  
//       // ตรวจสอบว่า car_brand_name, car_model_name และ car_images_file ถูกส่งมาหรือไม่
//       if (!car_brand_name || !car_model_name || !car_images_file) {
//         return new Response(
//           JSON.stringify({ message: "Missing required fields: car_brand_name, car_model_name, or car_images_file" }),
//           { status: 400, headers: { "Content-Type": "application/json" } }
//         );
//       }
  
//       // 1. เริ่มกระบวนการ Insert ข้อมูล car_brand ใหม่
//       const [carBrandResult] = await pool.query("INSERT INTO car_brand (car_brand_name) VALUES (?)", [
//         car_brand_name,
//       ]);
  
//       const car_brand_id = carBrandResult.insertId;  // car_brand_id ที่ถูกสร้างอัตโนมัติจากการ insert
  
//       // 2. เริ่มกระบวนการ Insert ข้อมูล car_model ที่อ้างอิง car_brand_id
//       const [carModelResult] = await pool.query("INSERT INTO car_model (car_brand_id, car_model_name) VALUES (?, ?)", [
//         car_brand_id,
//         car_model_name,
//       ]);
  
//       const car_model_id = carModelResult.insertId;  // car_model_id ที่ถูกสร้างอัตโนมัติจากการ insert
  
//       // 3. เริ่มกระบวนการ Insert ข้อมูล car_images ที่อ้างอิง car_model_id
//       const [carImagesResult] = await pool.query("INSERT INTO car_images (car_model_id, car_images_file) VALUES (?, ?)", [
//         car_model_id,
//         car_images_file,
//       ]);
  
//       return new Response(
//         JSON.stringify({ message: "Data successfully inserted", car_brand_id, car_model_id, car_images_file }),
//         { status: 201, headers: { "Content-Type": "application/json" } }
//       );
//     } catch (error) {
//       console.error("Error inserting data:", error);
//       return new Response(
//         JSON.stringify({ message: "Internal server error", error: error.message }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     }
//   }
export async function POST(req) {
    try {
      // รับข้อมูล JSON จาก Request
      const body = await req.json();
      const { car_brand_name, car_model_name, car_images_file } = body;
  
      // ตรวจสอบว่า car_brand_name, car_model_name และ car_images_file ถูกส่งมาหรือไม่
      if (!car_brand_name || !car_model_name || !car_images_file) {
        return new Response(
          JSON.stringify({ message: "Missing required fields: car_brand_name, car_model_name, or car_images_file" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
  
      // ตรวจสอบว่า car_brand_name มีอยู่แล้วในฐานข้อมูลหรือไม่
      const [existingCarBrand] = await pool.query(
        "SELECT id FROM car_brand WHERE car_brand_name = ?",
        [car_brand_name]
      );
  
      let car_brand_id;
      if (existingCarBrand.length > 0) {
        // ใช้ car_brand_id ที่มีอยู่แล้ว
        car_brand_id = existingCarBrand[0].id;
      } else {
        // สร้าง car_brand ใหม่
        const [carBrandResult] = await pool.query(
          "INSERT INTO car_brand (car_brand_name) VALUES (?)",
          [car_brand_name]
        );
        car_brand_id = carBrandResult.insertId; // car_brand_id ที่ถูกสร้างอัตโนมัติจากการ insert
      }
  
      // Insert ข้อมูล car_model ที่อ้างอิง car_brand_id
      const [carModelResult] = await pool.query(
        "INSERT INTO car_model (car_brand_id, car_model_name) VALUES (?, ?)",
        [car_brand_id, car_model_name]
      );
  
      const car_model_id = carModelResult.insertId; // car_model_id ที่ถูกสร้างอัตโนมัติจากการ insert
  
      // Insert ข้อมูล car_images ที่อ้างอิง car_model_id
      const [carImagesResult] = await pool.query(
        "INSERT INTO car_images (car_model_id, car_images_file) VALUES (?, ?)",
        [car_model_id, car_images_file]
      );
  
      return new Response(
        JSON.stringify({
          message: "Data successfully inserted",
          car_brand_id,
          car_model_id,
          car_images_file,
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error inserting data:", error);
      return new Response(
        JSON.stringify({ message: "Internal server error", error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  
  
