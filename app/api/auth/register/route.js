import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// กำหนดค่า Salt Round สำหรับ bcrypt
const SALT_ROUNDS = 10;

export async function POST(req) {
    try {

        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Name, email, and password are required." },
                { status: 400 }
            );
        }

        const [existingUser] = await pool.query("SELECT * FROM admin WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return NextResponse.json(
                { message: "Email is already taken." },
                { status: 400 }
            );
        }

        // เข้ารหัสรหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const [result] = await pool.query(
            "INSERT INTO admin (name, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
            [name, email, hashedPassword]
        );

        return NextResponse.json(
            { message: "Registration successful.", userId: result.insertId },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error during registration:", error);
        return NextResponse.json(
            { message: "An error occurred during registration." },
            { status: 500 }
        );
    }
}
