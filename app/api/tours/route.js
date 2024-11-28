import { pool } from "@/lib/db";

export async function POST(req) {
    try {
        const formData = await req.formData();

        // รับข้อมูลจาก formData
        const tourSectionName = formData.get("tour_section_name");
        const tourName = formData.get("tour_name");
        const tourDetail = formData.get("tour_detail");
        const tourHighlightsDetail = formData.get("tour_highlights_detail");

        // สร้าง tour section
        const [sectionResult] = await pool.execute(
            `INSERT INTO tour_section (tour_section_name, created_at, updated_at) VALUES (?, NOW(), NOW())`,
            [tourSectionName]
        );

        const tourSectionId = sectionResult.insertId;

        // สร้าง tour
        const [tourResult] = await pool.execute(
            `INSERT INTO tour (tour_section_id, tour_name, tour_detail, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())`,
            [tourSectionId, tourName, tourDetail]
        );

        const tourId = tourResult.insertId;

        // สร้าง highlight ของ tour
        await pool.execute(
            `INSERT INTO tour_highlight (tour_id, tour_highlight_detail, created_at, updated_at) VALUES (?, ?, NOW(), NOW())`,
            [tourId, tourHighlightsDetail]
        );

        const path = require('path');
        const fs = require('fs');

        const images = [];

        for (const key of formData.keys()) {
            if (key.startsWith("images")) {
                const file = formData.get(key);
                const status = formData.get(`${key}[status]`);

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
