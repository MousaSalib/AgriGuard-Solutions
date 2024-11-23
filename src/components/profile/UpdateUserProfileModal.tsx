"use client";

import { DOMAIN } from "@/utils/constants";
import { User } from "@prisma/client";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import { IoClose, IoEye, IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";

interface UpdateUserProfileModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: User;
}

const UpdateUserProfileModal = ({
  setOpen,
  user,
}: UpdateUserProfileModalProps) => {
  const router = useRouter();

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const updateUserProfileFormSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "") {
      return toast.error("Username is required");
    } else if (username.length < 2) {
      return toast.error("Username must be at least 2 characters");
    } else if (username.length > 100) {
      return toast.error("Username must be less than 100 characters");
    }

    if (email === "") {
      return toast.error("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return toast.error("Invalid email format");
    }

    const data: { username: string; email: string; password?: string } = {
      username,
      email,
    };

    if (password !== "") {
      if (password.length < 6) {
        return toast.error("Password must be at least 6 characters");
      }
      data.password = password;
    }

    try {
      await axios.put(`${DOMAIN}/api/users/profile/${user.id}`, data);
      setUsername("");
      setEmail("");
      setPassword("");
      router.refresh();
      toast.success("User profile updated successfully");
      setOpen(false);
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
            Update User Profile
          </h3>
          <div className="text-red-600 cursor-pointer bg-red-100 p-1 rounded-full hover:bg-red-200 transition-all">
            <IoClose size={28} onClick={() => setOpen(false)} />
          </div>
        </div>
        <form
          className="w-full flex flex-col space-y-3"
          onSubmit={updateUserProfileFormSubmitHandler}
        >
          <input
            type="text"
            placeholder="Edit your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full text-xl font-semibold text-customGreen px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Edit your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-xl font-semibold text-customGreen px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Reset your password (leave empty to not change)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            className=" text-white font-medium py-2 rounded-md transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateUserProfileModal;
