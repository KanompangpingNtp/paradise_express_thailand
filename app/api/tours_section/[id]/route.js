import { pool } from "@/lib/db";

export async function PUT(req, { params }) {
    try {
        const { id } = params; // รับ id จาก URL
        const { tour_section_name } = await req.json(); // รับข้อมูลจาก body

        if (!id || !tour_section_name) {
            return new Response(
                JSON.stringify({ success: false, message: "ID and Tour section name are required" }),
                { status: 400 }
            );
        }

        console.log("Updating tour section with ID:", id, "New name:", tour_section_name);

        const [result] = await pool.execute(
            `UPDATE tour_section SET tour_section_name = ?, updated_at = NOW() WHERE id = ?`,
            [tour_section_name, id]
        );

        if (result.affectedRows === 0) {
            return new Response(
                JSON.stringify({ success: false, message: "No tour section found with the provided ID" }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ success: true, message: "Tour section updated successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating tour section:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Failed to update tour section", error: error.message }),
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;

        // ตรวจสอบว่า ID มีค่าและเป็นตัวเลข
        if (!id || isNaN(id)) {
            return new Response(
                JSON.stringify({ success: false, message: "Invalid ID provided" }),
                { status: 400 }
            );
        }

        // ลบข้อมูลจากฐานข้อมูล
        const [result] = await pool.execute(
            `DELETE FROM tour_section WHERE id = ?`,
            [id]
        );

        // ตรวจสอบว่าเจอแถวที่ลบหรือไม่
        if (result.affectedRows === 0) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: `No tour section found with ID: ${id}`,
                }),
                { status: 404 }
            );
        }

        // สำเร็จ
        return new Response(
            JSON.stringify({
                success: true,
                message: "Tour section deleted successfully",
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting tour section:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to delete tour section",
                error: error.message,
            }),
            { status: 500 }
        );
    }
}

