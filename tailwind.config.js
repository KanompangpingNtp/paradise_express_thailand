/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1742px', // สำหรับช่วงระหว่าง 2xl และ 1920px
        'hd': '1919px',  // สำหรับหน้าจอ Full HD (1920x1080)
      },
      container: {
        center: true,
        padding: '2rem', // กำหนด padding ตามที่ต้องการ
        screens: {
          '3xl': '1536px', // กำหนดขนาดสูงสุดสำหรับ 3xl
          'hd': '1536px',  // กำหนดขนาดสูงสุดสำหรับ HD
        }
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
