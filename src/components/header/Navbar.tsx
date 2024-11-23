"use client";

import Link from "next/link";
import { FaPlantWilt } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import styles from "./Header.module.css";
import {  useState } from "react";
import CenterBar from "./CenterBar";

interface User {
  id: number;
  username: string;
  isAdmin: boolean;
}

interface NavbarProps {
  user: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <nav className={styles.navbar}>
        <div>
          <ul>
            <li>
              <Link href={"/"} className={styles.logo}>
                AgriGuard <FaPlantWilt /> Solutions
              </Link>
            </li>
          </ul>
          <div className={styles.menu}>
            {toggle ? (
              <IoCloseSharp onClick={() => setToggle((prev) => !prev)} />
            ) : (
              <IoMdMenu onClick={() => setToggle((prev) => !prev)} />
            )}
          </div>
        </div>
        <div>
          <CenterBar
            isAdmin={user?.isAdmin || false}
            toggle={toggle}
            setToggle={setToggle}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
