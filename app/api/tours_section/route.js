import { pool } from "@/lib/db";

export async function GET() {
    try {
        const [rows] = await pool.execute("SELECT * FROM tour_section");

        if (rows.length === 0) {
            return new Response(
                JSON.stringify({ success: false, message: "No tour sections found" }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ success: true, data: rows }), 
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching tour sections:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Failed to fetch tour sections", error: error.message }),
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const { tour_section_name } = await req.json();

        if (!tour_section_name) {
            return new Response(
                JSON.stringify({ success: false, message: "Tour section name is required" }),
                { status: 400 }
            );
        }

        const [result] = await pool.execute(
            `INSERT INTO tour_section (tour_section_name, created_at, updated_at) VALUES (?, NOW(), NOW())`,
            [tour_section_name]
        );

        return new Response(
            JSON.stringify({ success: true, message: "Tour section created successfully", id: result.insertId }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating tour section:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Failed to create tour section", error: error.message }),
            { status: 500 }
        );
    }
}