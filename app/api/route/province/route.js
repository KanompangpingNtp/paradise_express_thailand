import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

// Handle GET request
export async function GET() {
    try {
        const [rows] = await pool.query("SELECT * FROM province");
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error fetching provinces:", error);
        return NextResponse.json({ error: "Failed to fetch provinces" }, { status: 500 });
    }
}

// Handle POST request
export async function POST(request) {
    try {
        const { province_name } = await request.json();

        if (!province_name) {
            return NextResponse.json({ error: "Province name is required" }, { status: 400 });
        }

        const [result] = await pool.query(
            "INSERT INTO province (province_name) VALUES (?)",
            [province_name]
        );

        return NextResponse.json({
            id: result.insertId,
            province_name,
            message: "Province added successfully",
        });
    } catch (error) {
        console.error("Error adding province:", error);
        return NextResponse.json({ error: "Failed to add province" }, { status: 500 });
    }
}
