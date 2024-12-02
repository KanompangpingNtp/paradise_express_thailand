import { pool } from "@/lib/db";

export async function GET() {
    try {
      const [rows] = await pool.execute("SELECT id, tour_section_name FROM tour_section");
      return new Response(JSON.stringify(rows), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error fetching tour sections:", error);
      return new Response(JSON.stringify({ success: false, message: "Failed to fetch tour sections" }), {
        status: 500,
      });
    }
  }

export async function POST(req) {
    try {
      const formData = await req.formData();
      const tourSectionId = formData.get("tour_section_name"); // รับค่า `tour_section_name` (เป็น id)
      const tourName = formData.get("tour_name");
      const tourDetail = formData.get("tour_detail");
      const tourHighlightsDetail = formData.get("tour_highlights_detail");
  
      // ตรวจสอบว่า tourSectionId มีค่าหรือไม่
      if (!tourSectionId) {
        return new Response(
          JSON.stringify({ success: false, message: "กรุณาเลือกหัวข้อทัวร์" }),
          { status: 400 }
        );
      }
  
      // ตรวจสอบว่า `tourSectionId` ที่รับมาจากฟอร์มมีอยู่ในฐานข้อมูลหรือไม่
      const [sectionResult] = await pool.execute(
        `SELECT id FROM tour_section WHERE id = ?`,
        [tourSectionId]
      );
  
      if (sectionResult.length === 0) {
        return new Response(
          JSON.stringify({ success: false, message: "หัวข้อทัวร์ไม่ถูกต้อง" }),
          { status: 400 }
        );
      }
  
      // สร้างข้อมูลในตาราง `tour`
      const [tourResult] = await pool.execute(
        `INSERT INTO tour (tour_section_id, tour_name, tour_detail, created_at, updated_at) 
        VALUES (?, ?, ?, NOW(), NOW())`,
        [tourSectionId, tourName, tourDetail]
      );
  
      const tourId = tourResult.insertId;
  
      // สร้างข้อมูลในตาราง `tour_highlight`
      await pool.execute(
        `INSERT INTO tour_highlight (tour_id, tour_highlight_detail, created_at, updated_at) 
        VALUES (?, ?, NOW(), NOW())`,
        [tourId, tourHighlightsDetail]
      );
  
      // การจัดการการอัปโหลดไฟล์รูปภาพ
      const path = require('path');
      const fs = require('fs');
      const images = [];
  
      for (const [key, value] of formData.entries()) {
        if (key.startsWith("images[")) {
          const file = value;
          const index = key.match(/images\[(\d+)]/)[1];
          const status = formData.get(`image_status_${index}`);
  
          if (file && status) {
            const fileName = `${Date.now()}-${file.name}`;
            const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
            const buffer = Buffer.from(await file.arrayBuffer());
  
            fs.writeFileSync(filePath, buffer);
  
            const [result] = await pool.execute(
              `INSERT INTO tour_image (tour_id, tour_image_files, tour_image_status, created_at, updated_at) 
              VALUES (?, ?, ?, NOW(), NOW())`,
              [tourId, fileName, status]
            );
  
            images.push({ id: result.insertId, fileName, status });
          }
        }
      }
  
      return new Response(
        JSON.stringify({ success: true, message: "Tour created successfully", tourId, images }),
        { status: 200 }
      );
  
    } catch (error) {
      console.error("Error:", error);
      return new Response(
        JSON.stringify({ success: false, message: "Failed to create tour", error: error.message }),
        { status: 500 }
      );
    }
  }
  