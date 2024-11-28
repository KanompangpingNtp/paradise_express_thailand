"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// ตัวแปรเก็บ styles ไว้แยก
const styles = {
  nav: {
    base: "fixed top-0 left-0 w-full bg-black text-white transition-transform duration-300 opacity-90 z-50",
    hidden: "-translate-y-full",
    visible: "translate-y-0",
  },
  container: "container mx-auto flex justify-center items-center h-14 text-xl",
  logo: "text-lg font-bold",
  menu: "flex gap-6 ml-8",
  link: "transition-colors duration-300 mx-4", // คลาสพื้นฐานสำหรับลิงก์
  linkHover: "hover:text-orange-400", // สีที่ใช้เมื่อ hover
  linkActive: "text-orange-400", // สีสำหรับหน้าปัจจุบัน
};

// ตัวแปรเก็บข้อมูลเมนู
const menuItems = [
  { href: "/", label: "Home" },
  { href: "/pages/tour-packages", label: "Tour Packages" },
  { href: "/pages/transfer", label: "Transfer" },
  { href: "/", label: "Contact" },
  { href: "/pages/login", label: "Login" },
];

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setShow(false); // ซ่อนเมื่อเลื่อนลง
    } else {
      setShow(true); // แสดงเมื่อเลื่อนขึ้น
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // ตรวจสอบเส้นทางปัจจุบันโดยใช้ window.location.pathname
  const currentPath = window.location.pathname;

  return (
    <nav
      className={`${styles.nav.base} ${show ? styles.nav.visible : styles.nav.hidden}`}
    >
      <div className={styles.container}>
        {/* โลโก้ */}
        <div className={styles.logo}>
          <Image
            src="/images/logo_edited.avif" // ระบุ path ของไฟล์โลโก้ใน public
            alt="Logo"
            width={47} // กำหนดความกว้าง
            height={47} // กำหนดความสูง
            priority // เพิ่ม priority ให้โลโก้โหลดก่อน
          />
        </div>

        {/* เมนู */}
        <ul className={styles.menu}>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className={`${styles.link} ${
                  currentPath === item.href ? styles.linkActive : styles.linkHover
                }`} // เปลี่ยนสีเมื่อเส้นทางตรงกับ href
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
