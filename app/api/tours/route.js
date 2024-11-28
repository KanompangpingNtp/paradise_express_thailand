import { NextResponse } from 'next/server';
import { pool } from '@/lib/db'; // สมมติว่าคุณมีไฟล์ตั้งค่าฐานข้อมูล

export async function GET() {
    try {
        // Query ดึงข้อมูลจากตารางที่ต้องการ JOIN
        const query = `
            SELECT 
                t.id AS tour_id,
                t.tour_name,
                t.tour_detail,
                ts.tour_section_name,
                ti.tour_image_files,
                ti.tour_image_status,
                th.tour_highlight_detail
            FROM 
                tourt
            LEFT JOIN 
                tour_section ts ON t.tour_section_id = ts.id
            LEFT JOIN 
                tour_image ti ON ti.tour_id = t.id
            LEFT JOIN 
                tour_highlight th ON th.tour_id = t.id
            ORDER BY 
                t.id;
        `;

        // ใช้ pool.query() เพื่อรันคำสั่ง SQL
        const [rows] = await pool.query(query);

        // ส่งข้อมูลกลับในรูป JSON
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Error fetching tours:', error);
        return NextResponse.json({ error: 'Error fetching tours' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        // รับค่าจาก request body
        const { 
            tour_name, 
            tour_detail, 
            tour_section_name, 
            tour_images, 
            tour_highlights 
        } = body;

        // ตรวจสอบว่าข้อมูลครบถ้วน
        if (!tour_name || !tour_detail || !tour_section_name) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // เริ่มต้น transaction
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            // Insert into tour_section
            const [sectionResult] = await connection.query(
                `INSERT INTO tour_section (tour_section_name, created_at, updated_at)
                 VALUES (?, NOW(), NOW())`,
                [tour_section_name]
            );
            const tour_section_id = sectionResult.insertId;

            // Insert into tour
            const [tourResult] = await connection.query(
                `INSERT INTO tour (tour_name, tour_detail, tour_section_id, created_at, updated_at)
                 VALUES (?, ?, ?, NOW(), NOW())`,
                [tour_name, tour_detail, tour_section_id]
            );
            const tour_id = tourResult.insertId;

            // Insert into tour_image (ถ้ามี)
            if (tour_images && tour_images.length > 0) {
                const imageData = tour_images.map(image => [
                    tour_id, image.file, image.status, new Date(), new Date()
                ]);
                await connection.query(
                    `INSERT INTO tour_image (tour_id, tour_image_files, tour_image_status, created_at, updated_at)
                     VALUES ?`,
                    [imageData]
                );
            }

            // Insert into tour_highlight (ถ้ามี)
            if (tour_highlights && tour_highlights.length > 0) {
                const highlightData = tour_highlights.map(highlight => [
                    tour_id, highlight.detail, new Date(), new Date()
                ]);
                await connection.query(
                    `INSERT INTO tour_highlight (tour_id, tour_highlight_detail, created_at, updated_at)
                     VALUES ?`,
                    [highlightData]
                );
            }

            // Commit transaction
            await connection.commit();
            connection.release();

            return NextResponse.json(
                { message: 'Tour created successfully', tour_id },
                { status: 201 }
            );
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    } catch (error) {
        console.error('Error creating tour:', error);
        return NextResponse.json({ error: 'Error creating tour' }, { status: 500 });
    }
}