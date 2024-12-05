import { pool } from "@/lib/db";
import path from "path";
import fs from "fs";

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
      console.error("Error fetching tour sections :", error);
      return new Response(JSON.stringify({ success: false, message: "Failed to fetch tour sections" }), {
        status: 500,
      });
    }
  }

  export async function POST(req) {
    try {
      const formData = await req.formData();

      console.log("Received Form Data:", formData);

      const tourSectionName = formData.get("tour_section_name");
      const tourName = formData.get("tour_name");
      const tourDetail = formData.get("tour_detail");

      if (!tourSectionName) {
        return new Response(
          JSON.stringify({ success: false, message: "กรุณาเลือกหัวข้อทัวร์" }),
          { status: 400 }
        );
      }

      const [sectionResult] = await pool.execute(
        `SELECT id FROM tour_section WHERE tour_section_name = ?`,
        [tourSectionName]
      );

      if (sectionResult.length === 0) {
        return new Response(
          JSON.stringify({ success: false, message: "หัวข้อทัวร์ไม่ถูกต้อง" }),
          { status: 400 }
        );
      }
      const tourSectionId = sectionResult[0].id;

      // สร้างข้อมูลในตาราง `tour`
      const [tourResult] = await pool.execute(
        `INSERT INTO tour (tour_section_id, tour_name, tour_detail, created_at, updated_at)
        VALUES (?, ?, ?, NOW(), NOW())`,
        [tourSectionId, tourName, tourDetail]
      );

      const tourId = tourResult.insertId;

      const tourHighlights = formData.getAll("tour_highlights_detail[]");

      if (tourHighlights.length > 0) {
        for (let highlight of tourHighlights) {
          await pool.execute(
            `INSERT INTO tour_highlight (tour_id, tour_highlight_detail, created_at, updated_at)
            VALUES (?, ?, NOW(), NOW())`,
            [tourId, highlight]
          );
        }
      }

      const images = [];
      // จัดการกับรูปภาพ
      for (const [key, value] of formData.entries()) {
        if (key.startsWith("images[")) {
          const file = value;
          const index = key.match(/images\[(\d+)]/)[1]; // ดึง index จาก key
          const status = formData.get(`image_status_${index}`);

          if (file && status) {
            const fileName = `${Date.now()}-${file.name}`;
            const filePath = path.join(process.cwd(), "public", "uploads", fileName);
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

      // จัดการกับไฟล์ PDF
      const pdfFile = formData.get("pdf_file");

      if (pdfFile) {

        const pdfFileName = `${Date.now()}-${pdfFile.name}`;
        const pdfFilePath = path.join(process.cwd(), "public", "pdf", pdfFileName);
        const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());

        try {
          // บันทึกไฟล์ PDF
          fs.writeFileSync(pdfFilePath, pdfBuffer);
          console.log(`PDF file saved at: ${pdfFilePath}`);
        } catch (error) {
          console.error("Error saving PDF file:", error);
          return new Response(
            JSON.stringify({ success: false, message: "Failed to save PDF file" }),
            { status: 500 }
          );
        }

        try {
          // บันทึกข้อมูลในตาราง `tour_pdf`
          const [pdfResult] = await pool.execute(
            `INSERT INTO tour_pdf (tour_id, tour_pdf_file, created_at, updated_at )
             VALUES (?, ?, NOW(), NOW())`,
            [tourId, pdfFileName]
          );
          console.log("PDF data saved in database:", pdfResult);
        } catch (error) {
          console.error("Error saving PDF to database:", error);
          return new Response(
            JSON.stringify({ success: false, message: "Failed to save PDF data to database", error: error.message }),
            { status: 500 }
          );
        }

        return new Response(
          JSON.stringify({ success: true, message: "Tour created successfully", tourId, images, pdfFileName }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({ success: true, message: "Tour created successfully", tourId, images }),
          { status: 200 }
        );
      }

    } catch (error) {
      console.error("Error:", error);
      return new Response(
        JSON.stringify({ success: false, message: "Failed to create tour", error: error.message }),
        { status: 500 }
      );
    }
  }

