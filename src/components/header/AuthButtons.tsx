"use client";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { FaRegRegistered } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
const AuthButtons = () => {
  const pathname = usePathname();
  return (
    <>
      <ul className={styles.rightSide}>
        <li>
          <Link
            href={"/login"}
            className={`${styles.rightSideItems} ${
              pathname === "/login" ? styles.activeLinkAuth : ""
            }`}
          >
            <FiLogIn /> Login
          </Link>
        </li>
        <li>
          <Link
            href={"/register"}
            className={`${styles.rightSideItems} ${
              pathname === "/register" ? styles.activeLinkAuth : ""
            }`}
          >
            <FaRegRegistered /> Register
          </Link>
        </li>
      </ul>
    </>
  );
};

export default AuthButtons;
