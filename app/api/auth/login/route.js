import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//test
export async function GET() {
    return NextResponse.json({ message: "Login endpoint is working!" });
}

// กำหนด Secret Key สำหรับ JWT
const JWT_SECRET = process.env.JWT_SECRET || "secret_key_auth";

// //login
// export async function POST(req) {
//     try {
//         const { name, password } = await req.json();
//         console.log("Request data:", { name, password });

//         if (!name || !password) {
//             return NextResponse.json(
//                 { message: "Name and password are required." },
//                 { status: 400 }
//             );
//         }

//         const [rows] = await pool.query("SELECT * FROM admin WHERE name = ?", [name]);
//         const user = rows[0];
//         console.log("User from DB:", user);

//         if (!user) {
//             return NextResponse.json(
//                 { message: "Invalid name or password." },
//                 { status: 401 }
//             );
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);
//         console.log("Password match:", passwordMatch);

//         if (!passwordMatch) {
//             return NextResponse.json(
//                 { message: "Invalid name or password." },
//                 { status: 401 }
//             );
//         }

//         const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: "1h" });
//         return NextResponse.json({ message: "Login successful.", token }, { status: 200 });
//     } catch (error) {
//         console.error("Error during login:", error);
//         return NextResponse.json(
//             { message: "An error occurred during login." },
//             { status: 500 }
//         );
//     }
// }
export async function POST(req) {
    try {
        const { name, password } = await req.json();
        console.log("Request data:", { name, password });

        if (!name || !password) {
            return NextResponse.json(
                { message: "Name and password are required." },
                { status: 400 }
            );
        }

        const [rows] = await pool.query("SELECT * FROM admin WHERE name = ?", [name]);
        const user = rows[0];
        console.log("User from DB:", user);

        if (!user) {
            return NextResponse.json(
                { message: "Invalid name or password." },
                { status: 401 }
            );
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", passwordMatch);

        if (!passwordMatch) {
            return NextResponse.json(
                { message: "Invalid name or password." },
                { status: 401 }
            );
        }

        // สร้าง JWT token
        const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: "1h" });

        // ส่ง token ไปเก็บใน cookies
        const response = NextResponse.json({ message: "Login successful.", token }, { status: 200 });

        // ตั้งค่า auth_token ใน cookies
        response.cookies.set('auth_token', token, {
            httpOnly: true, // ป้องกันการเข้าถึงจาก JavaScript
            secure: process.env.NODE_ENV === 'production', // ใช้ HTTPS ใน production
            maxAge: 60 * 60, // ตั้งเวลาให้หมดอายุใน 1 ชั่วโมง
            path: '/', // ใช้ได้กับทุกเส้นทาง
        });

        return response;

    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json(
            { message: "An error occurred during login." },
            { status: 500 }
        );
    }
}

//logout
export async function DELETE(req) {
    try {
        // ลบ Token ออกจาก Client (ไม่มีการเก็บ Token ที่ฝั่ง Server)
        return NextResponse.json(
            { message: "Logout successful." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during logout:", error);
        return NextResponse.json(
            { message: "An error occurred during logout." },
            { status: 500 }
        );
    }
}