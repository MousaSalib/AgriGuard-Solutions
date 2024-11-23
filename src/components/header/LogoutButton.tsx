"use client";
import { FiLogOut } from "react-icons/fi";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useState } from "react";
const LogoutButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.warning("Something went error");
      console.log(error);
    }
  };
  return (
    <button
      onClick={logoutHandler}
      className={`${styles.logoutButton}`}
      style={{ background: isHovered ? "#b91c1c" : "#dc2626" }}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <FiLogOut style={{ fontSize: "20px" }} />
      Logout
    </button>
  );
};

export default LogoutButton;
