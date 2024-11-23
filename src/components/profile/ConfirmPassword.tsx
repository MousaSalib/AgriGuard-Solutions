"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import { IoClose, IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";

interface ConfirmPasswordProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}

const ConfirmPassword = ({ setOpen, id }: ConfirmPasswordProps) => {
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const deleteUserProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (confirm("Are you sure you want to delete your profile?")) {
        const response = await axios.post(
          `${DOMAIN}/api/users/verify-password`,
          {
            id,
            password: confirmPassword,
          }
        );

        if (response.data.success) {
          await axios.delete(`${DOMAIN}/api/users/profile/${id}`);
          toast.success("Your account has been deleted successfully");
          router.push("/");
          router.refresh();
        } else {
          toast.error("Password is incorrect. Please try again.");
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "An error occurred");
        console.log(error);
      } else {
        toast.error("An unexpected error occurred");
        console.error(error);
      }
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
      <motion.div
        layout
        initial={{ transform: "scale(0)" }}
        animate={{ transform: "scale(1)" }}
        transition={{ type: "spring", damping: 8, stiffness: 50 }}
        className="relative lg:w-5/6 md:w-5/6 sm:w-full bg-customGreen p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4 z-50"
        style={{ border: "2px solid #ffff00" }}
      >
        <div className="w-full flex justify-between items-center">
          <h3 className="text-xl font-bold" style={{ color: "#ffff00" }}>
            Delete User Account
          </h3>
          <div className="text-red-600 cursor-pointer bg-red-100 p-1 rounded-full hover:bg-red-200 transition-all">
            <IoClose size={28} onClick={() => setOpen(false)} />
          </div>
        </div>
        <form
          className="w-full flex flex-col space-y-3"
          onSubmit={deleteUserProfile}
        >
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Re-Enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full text-xl font-semibold text-customGreen px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-customGreen"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </div>
          </div>
          <button
            type="submit"
            className="font-medium py-2 rounded-md transition duration-300"
            style={{ background: "red", color: "white" }}
          >
            DELETE
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ConfirmPassword;
