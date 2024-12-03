import { pool } from "@/lib/db";

export async function GET(req) {
  try {
    const query = `
      SELECT 
        t.id AS tour_id,
        t.tour_name,
        t.tour_detail,
        ts.tour_section_name,
        ti.tour_image_files, 
        ti.tour_image_status, 
        th.tour_highlight_detail,
        tp.tour_pdf_file
      FROM tour t
      LEFT JOIN tour_section ts ON t.tour_section_id = ts.id
      LEFT JOIN tour_image ti ON t.id = ti.tour_id
      LEFT JOIN tour_highlight th ON t.id = th.tour_id
      LEFT JOIN tour_pdf tp ON t.id = tp.tour_id
      ORDER BY t.created_at DESC;
    `;
    
    const [results] = await pool.execute(query);

    // ประมวลผลข้อมูล
    const tours = [];
    let currentTour = null;

    results.forEach((row) => {
      if (!currentTour || currentTour.tour_id !== row.tour_id) {
        // เพิ่มทัวร์ใหม่
        if (currentTour) {
          // กรอง highlight และ images ซ้ำ
          currentTour.highlights = [...new Set(currentTour.highlights)];
          currentTour.images = currentTour.images.filter((value, index, self) => 
            index === self.findIndex((img) => img.file === value.file && img.status === value.status)
          );
          
          tours.push(currentTour);
        }

        currentTour = {
          tour_id: row.tour_id,
          name: row.tour_name,
          detail: row.tour_detail,
          section_name: row.tour_section_name,
          highlights: [],
          images: [],
          pdf: row.tour_pdf_file || null,
        };
      }

      // เพิ่ม highlight
      if (row.tour_highlight_detail) {
        currentTour.highlights.push(row.tour_highlight_detail);
      }

      // เพิ่มภาพ
      if (row.tour_image_files && row.tour_image_status) {
        currentTour.images.push({
          file: row.tour_image_files,
          status: row.tour_image_status,
        });
      }
    });

    // เพิ่มทัวร์สุดท้ายที่ไม่ได้เพิ่มในลูป
    if (currentTour) {
      // กรอง highlight และ images ซ้ำ
      currentTour.highlights = [...new Set(currentTour.highlights)];
      currentTour.images = currentTour.images.filter((value, index, self) => 
        index === self.findIndex((img) => img.file === value.file && img.status === value.status)
      );
      
      tours.push(currentTour);
    }

    return new Response(JSON.stringify({ success: true, tours }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching tours:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch tours." }),
      { status: 500 }
    );
  }
}
