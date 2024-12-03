import path from "path";
import fs from "fs";
import { pool } from "@/lib/db";

export async function DELETE(req, { params }) {
    try {
        const { id } = params;

        // ขั้นตอนที่ 1: ลบข้อมูล highlight ของทัวร์
        await pool.execute(`DELETE FROM tour_highlight WHERE tour_id = ?`, [id]);

        // ขั้นตอนที่ 2: ลบภาพของทัวร์จากฐานข้อมูลและระบบไฟล์
        const [imagesResult] = await pool.execute(`SELECT tour_image_files FROM tour_image WHERE tour_id = ?`, [id]);

        imagesResult.forEach((image) => {
            const filePath = path.join(process.cwd(), "public", "uploads", image.tour_image_files);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });

        // ขั้นตอนที่ 3: ลบ PDF ของทัวร์จากฐานข้อมูลและระบบไฟล์
        const [pdfResult] = await pool.execute(`SELECT tour_pdf_file FROM tour_pdf WHERE tour_id = ?`, [id]);

        if (pdfResult.length > 0) {
            const pdfFilePath = path.join(process.cwd(), "public", "pdf", pdfResult[0].tour_pdf_file);
            if (fs.existsSync(pdfFilePath)) {
                fs.unlinkSync(pdfFilePath);
            }
        }

        // ลบข้อมูลจากฐานข้อมูล
        await pool.execute(`DELETE FROM tour_image WHERE tour_id = ?`, [id]);
        await pool.execute(`DELETE FROM tour_pdf WHERE tour_id = ?`, [id]);
        const [tourResult] = await pool.execute(`DELETE FROM tour WHERE id = ?`, [id]);

        if (tourResult.affectedRows === 0) {
            return new Response(JSON.stringify({ success: false, message: "Tour not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, message: "Tour deleted successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ success: false, message: "Failed to delete tour", error: error.message }), { status: 500 });
    }
}