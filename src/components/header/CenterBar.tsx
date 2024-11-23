"use client";

import Link from "next/link";
import { AiFillProduct } from "react-icons/ai";
import { IoHome } from "react-icons/io5";
import { MdOutlineRoundaboutRight } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import styles from "./Header.module.css";
import {  Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";

interface CenterBarProps {
  isAdmin: boolean;
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>
}

const CenterBar = ({ isAdmin, toggle, setToggle }: CenterBarProps) => {
  const pathname = usePathname();

  return (
    <>
      <div
        className={styles.iconsWrapper}
        style={{
          clipPath: (toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)") || "",
        }}
      >
        <ul className={styles.headerLinks}>
          <li>
            <Link
              onClick={() => setToggle(false)}
              href="/"
              className={`${styles.linkItem} ${
                pathname === "/" ? styles.activeLink : ""
              }`}
            >
              <IoHome className={styles.icon} />
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setToggle(false)}
              href="/products?pageNumber=1"
              className={`${styles.linkItem} ${
                pathname.startsWith("/products") ? styles.activeLink : ""
              }`}
            >
              <AiFillProduct className={styles.icon} />
              Products
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setToggle(false)}
              href="/about"
              className={`${styles.linkItem} ${
                pathname === "/about" ? styles.activeLink : ""
              }`}
            >
              <MdOutlineRoundaboutRight className={styles.icon} />
              About
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link
                onClick={() => setToggle(false)}
                href="/admin"
                className={`${styles.linkItem} ${
                  pathname === "/admin" ||
                  pathname.startsWith("/admin/products-table") ||
                  pathname.startsWith("/admin/comments-table")
                    ? styles.activeLink
                    : ""
                }`}
              >
                <RiAdminFill className={styles.icon} />
                Admin
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default CenterBar;
