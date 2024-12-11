/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // ใช้ app directory (ถ้าคุณใช้ App Router)
  },
  reactStrictMode: true, // เปิด react strict mode
  swcMinify: true, // เปิดการใช้ SWC minify สำหรับการลดขนาดไฟล์
};

export default nextConfig;
