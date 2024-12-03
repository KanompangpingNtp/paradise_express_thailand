import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();
    const { to, subject, text } = body;

    // ตั้งค่า transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // อีเมลผู้ส่ง
        pass: process.env.EMAIL_PASS, // รหัสผ่านหรือ App Password
      },
    });

    // ส่งอีเมล
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // อีเมลผู้ส่ง
      to, // อีเมลผู้รับ
      subject, // หัวข้ออีเมล
      text, // เนื้อหาอีเมล
    });

    return new Response(
      JSON.stringify({ message: 'Email sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to send email', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
