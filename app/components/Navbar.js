"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HomeIcon,
  ShoppingBagIcon,
  HeartIcon,
  PhoneIcon,
  ListBulletIcon,
  UserIcon,
  TruckIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";

const styles = {
  nav: {
    base: "fixed top-0 left-0 w-full bg-black text-white transition-transform duration-300 opacity-80 z-40 hidden lg:block",
    hidden: "-translate-y-full",
    visible: "translate-y-0",
  },
  container:
    "container mx-auto px-4 flex justify-between items-center h-20 text-xl lg:text-lg",
  logo: "text-lg font-bold cursor-pointer h-auto w-auto",
  menuWrapper: "flex gap-6 justify-center flex-grow",
  menu: "flex gap-6",
  link: "transition-colors duration-300 mx-4",
  linkHover: "hover:text-orange-400",
  linkActive: "text-orange-400",
  loginLink: "ml-auto",
  bottomNavWrapper:
    "fixed bottom-0 left-0 right-0 bg-black shadow-lg opacity-80 z-50 lg:hidden",
  bottomNavContainer: "flex justify-around items-center h-16",
  bottomNavItem:
    "flex flex-col items-center justify-center text-gray-200 hover:text-orange-400 transition-colors duration-200 text-xs",
  dropdown: "dropdown dropdown-end",
  dropdownMenu: "menu menu-compact p-2 shadow bg-white rounded-box w-52",
  dropdownItem:
    "text-gray-200 hover:text-orange-400 transition-colors duration-200",
};

const menuItems = [
  {
    href: "/pages/tour-packages",
    label: "Tour Packages",
    icon: ShoppingBagIcon,
  },
  { href: "/pages/sightseeing", label: "Sightseeing", icon: HeartIcon },
  { href: "/pages/transfer", label: "Transfer", icon: TruckIcon },
  { href: "/pages/customized", label: "Customized", icon: SwatchIcon },
  { href: "#footer", label: "Contact", icon: PhoneIcon },
  { href: "/", label: "Login", icon: UserIcon },
];

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showBottomNav, setShowBottomNav] = useState(true);

  const handleScroll = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
      setShowBottomNav(false);
    } else {
      setShow(true);
      setShowBottomNav(true);
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

  return (
    <>
      {/* Top Navbar */}
      <nav
        className={`${styles.nav.base} ${
          show ? styles.nav.visible : styles.nav.hidden
        }`}
      >
        <div className={styles.container}>
          {/* Logo ซ้ายสุด */}
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

          {/* เมนูลิงก์ตรงกลาง */}
          <div className={`${styles.menuWrapper} flex-1`}>
            <ul className={styles.menu}>
              {menuItems
                .filter((item) => item.label !== "Login") // เอา "Login" ออกจากส่วนกลาง
                .map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`${styles.link} ${
                        currentPath === item.href
                          ? styles.linkActive
                          : styles.linkHover
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Login ขวาสุด */}
          <div className={styles.loginLink}>
            <Link
              href="/"
              className={`${styles.link} ${styles.linkHover} flex items-center`}
            >
              <UserIcon className="w-5 h-5 mr-2" />
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation Bar */}
      <div
        className={`${styles.bottomNavWrapper} ${
          showBottomNav ? "" : "translate-y-full"
        }`}
      >
        <div className={styles.bottomNavContainer}>
          {/* แสดง 3 ลิงก์แรก */}
          {menuItems.slice(0, 3).map((item, index) => (
            <Link key={index} href={item.href} className={styles.bottomNavItem}>
              {item.icon && <item.icon className="w-6 h-6 mb-1" />}
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Dropdown สำหรับลิงก์ที่เหลือ */}
          <div className="relative group">
            <button className={`${styles.bottomNavItem}`}>
              <ListBulletIcon className="w-6 h-6 mb-1" />
              <span>Menu</span>
            </button>
            <ul className="absolute right-[-2vh] bottom-full hidden group-hover:block bg-black shadow-lg rounded-lg w-40 transition-transform duration-300 transform scale-95 group-hover:scale-100">
              {/* รายการลิงก์ใน dropdown */}
              {/* เพิ่มรายการเพิ่มเติม เช่น Login */}
              <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-900">
                <HomeIcon className="w-5 h-5 text-gray-200" />
                <Link
                  href="/login"
                  className="text-gray-200 hover:text-orange-400 duration-300 flex-grow"
                >
                  Home
                </Link>
              </li>
              {menuItems.slice(3).map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 text-gray-200 hover:text-orange-400 duration-300 flex-grow hover:bg-gray-900"
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  <Link href={item.href} className="">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
