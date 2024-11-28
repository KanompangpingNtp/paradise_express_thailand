"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link"; // ใช้ Link จาก Next.js

const styles = {
  nav: {
    base: "fixed top-0 left-0 w-full bg-black text-white transition-transform duration-300 opacity-90 z-50",
    hidden: "-translate-y-full",
    visible: "translate-y-0",
  },
  container: "container mx-auto px-4 flex justify-between items-center h-14 text-xl",
  logo: "text-lg font-bold cursor-pointer",
  menuWrapper: "flex gap-6 justify-center flex-grow", // เมนูจะขยายให้เต็มพื้นที่
  menu: "flex gap-6",
  link: "transition-colors duration-300 mx-4",
  linkHover: "hover:text-orange-400",
  linkActive: "text-orange-400",
  loginLink: "ml-auto", // ทำให้ login อยู่ขวาสุด
};

const menuItems = [
  { href: "/pages/tour-packages", label: "Tour Packages" },
  { href: "/pages/sightseeing", label: "Sightseeing" },
  { href: "/pages/transfer", label: "Transfer" },
  { href: "/pages/customized", label: "Customized" },
  { href: "#footer", label: "Contact" }, // ใช้ href เป็น #footer สำหรับการเลื่อนไปที่ footer
  { href: "/pages/login", label: "Login", isLogin: true },
];

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const currentPath = window.location.pathname;

  // ฟังก์ชันเพื่อเลื่อนไปที่ footer
  const handleContactClick = () => {
    const footer = document.getElementById("footer");
    footer.scrollIntoView({ behavior: "smooth" }); // เลื่อนด้วย behavior smooth
  };

  return (
    <nav className={`${styles.nav.base} ${show ? styles.nav.visible : styles.nav.hidden}`}>
      <div className={styles.container}>
        {/* Logo อยู่ซ้ายสุด */}
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/images/logo_edited.avif"
              alt="Logo"
              width={47}
              height={47}
              priority
            />
          </Link>
        </div>

        {/* เมนูหลักจะขยายเต็มพื้นที่ */}
        <div className={styles.menuWrapper}>
          <ul className={styles.menu}>
            {menuItems.map((item, index) => (
              !item.isLogin && (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`${styles.link} ${currentPath === item.href ? styles.linkActive : styles.linkHover}`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            ))}
          </ul>
        </div>

        {/* ลิงก์ login อยู่ขวาสุด */}
        <ul className={styles.menu}>
          {menuItems.map((item, index) => (
            item.isLogin && (
              <li key={index} className={styles.loginLink}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${currentPath === item.href ? styles.linkActive : styles.linkHover}`}
                >
                  {item.label}
                </Link>
              </li>
            )
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
