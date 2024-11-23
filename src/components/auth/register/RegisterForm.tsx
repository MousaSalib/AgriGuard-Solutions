"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import LoadingSpinner from "@/components/LoadingSpinner";

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const registerFormSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "") return toast.error("Username is required");
    if (email === "") return toast.error("Email is required");
    if (password === "") return toast.error("Password is required");

    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/users/register`, {
        username,
        email,
        password,
      });
      setLoading(false);
      router.replace("/");
      router.refresh();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "An error occurred");
        console.log(error);
        setLoading(false);
      } else {
        toast.error("An unexpected error occurred");
        console.error(error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md rounded-xl p-6 sm:p-8 space-y-6">
        <form onSubmit={registerFormSubmitHandler} className="space-y-6">
          <div>
            <label className="block mb-2 text-xl font-bold text-white">
              Username
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <FaRegUser className="text-white text-2xl mx-3" />
              <input
                type="text"
                className="w-full p-3 text-customGreen font-bold text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-xl font-bold text-white">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <MdOutlineMail className="text-white text-2xl mx-3" />
              <input
                type="email"
                className="w-full p-3 text-customGreen font-bold text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-xl font-bold text-white">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 text-customGreen font-bold text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={togglePasswordVisibility}
                className="px-3 cursor-pointer text-white"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>
          </div>
          <button
            disabled={loading}
            type="submit"
            className={`w-full py-3 text-lg font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? <LoadingSpinner /> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
