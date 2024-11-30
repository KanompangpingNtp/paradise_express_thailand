import { redirect } from "next/navigation";

export default function Home() {
  // รีไดเร็กต์ไปยังหน้า /home เมื่อผู้ใช้เข้าถึงหน้า root
  redirect("/pages/home");

  return null; // หรือคุณอาจจะไม่ต้องการให้แสดงอะไร
}
