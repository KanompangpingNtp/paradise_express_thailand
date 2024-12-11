/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // เปิด react strict mode
  experimental: {
    // ลบ appDir หากไม่ได้ใช้ App Router
    appDir: false, 
  },
};

export default nextConfig;
