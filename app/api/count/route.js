// /api/count

import { pool } from "@/lib/db"; // เชื่อมต่อกับฐานข้อมูลของคุณ

export async function GET() {
  try {
    // เพิ่มการล็อกเพื่อให้ทราบว่า API ถูกเรียกหรือไม่
    console.log("Fetching counts for tours and tour_sections...");

    const [rowsTourSections] = await pool.execute(
      "SELECT COUNT(*) AS count FROM tour_section"
    );
    const [rowsTours] = await pool.execute(
      "SELECT COUNT(*) AS count FROM tour"
    );

    // ตรวจสอบว่า query ทั้งสองประสบความสำเร็จหรือไม่
    if (rowsTourSections.length === 0 || rowsTours.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "No data found" }),
        { status: 404 }
      );
    }

    // console.log("Tour Sections Count: ", rowsTourSections[0].count);
    // console.log("Tours Count: ", rowsTours[0].count);

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          tour_sections_count: rowsTourSections[0].count,
          tours_count: rowsTours[0].count,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching tour counts:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch counts",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
