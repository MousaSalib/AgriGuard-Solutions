"use client";

import { MdDashboardCustomize } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../Admin.module.css";

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full sm:w-40 md:w-52 lg:w-64 px-4 py-6 text-white">
      <Link
        href={"/admin"}
        className={`flex items-center text-lg md:text-xl lg:text-2xl font-semibold ${
          pathname === "/admin" ? styles.activeLink : ""
        }`}
      >
        <MdDashboardCustomize className="text-3xl me-1" />
        <span className="hidden lg:block">Dashboard</span>
      </Link>
      <ul className="mt-10 flex items-center justify-center flex-col sm:justify-start lg:items-start">
        <li className="w-full">
          <Link
            href={"/admin/products-table?pageNumber=1"}
            className={`flex items-center text-lg md:text-xl mb-5 sm:mb-6 lg:mb-8 ${
              styles.dashboardLinks
            } ${
              pathname.startsWith("/admin/products-table")
                ? styles.activeLink
                : ""
            }`}
          >
            <AiFillProduct className="text-2xl me-2" />
            <span className="hidden lg:block">Products</span>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href={"/admin/comments-table"}
            className={`flex items-center text-lg md:text-xl mb-5 sm:mb-6 lg:mb-8 ${
              styles.dashboardLinks
            } ${pathname === "/admin/comments-table" ? styles.activeLink : ""}`}
          >
            <FaComments className="text-2xl me-2" />
            <span className="hidden lg:block">Comments</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
