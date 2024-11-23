"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

interface UpdateCommentModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  commentId: number;
  text: string;
}

const UpdateCommentModal = ({
  setOpen,
  text,
  commentId,
}: UpdateCommentModalProps) => {
  const router = useRouter();
  const [updatedText, setUpdatedText] = useState(text);

  const updateCommentModal = async (e: FormEvent) => {
    e.preventDefault();
    if (updatedText === "") return toast.info("Please enter a comment");
    try {
      await axios.put(`${DOMAIN}/api/comments/${commentId}`, {
        text: updatedText,
      });
      toast.success("Comment updated successfully!");
      setUpdatedText("");
      setOpen(false);
      router.refresh();
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
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => setOpen(false)}
      ></div>
      <motion.div
        layout
        initial={{ transform: "scale(0)" }}
        animate={{ transform: "scale(1)" }}
        transition={{ type: "spring", damping: 8, stiffness: 50 }}
        className="relative lg:w-1/3 md:w-2/3 sm:w-full bg-customGreen p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4 z-50"
        style={{ border: "2px solid #ffff00" }}
      >
        <div className="w-full flex justify-between items-center">
          <h3 className="text-xl font-bold" style={{ color: "#ffff00" }}>
            Edit Comment
          </h3>
          <div
            onClick={() => setOpen(false)}
            className="text-red-600 cursor-pointer bg-red-100 p-1 rounded-full hover:bg-red-200 transition-all"
          >
            <IoClose size={28} />
          </div>
        </div>
        <form
          className="w-full flex flex-col space-y-3"
          onSubmit={updateCommentModal}
        >
          <input
            type="text"
            placeholder="Edit your comment"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            className="w-full text-xl font-semibold text-customGreen px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="font-medium py-2 rounded-md transition duration-300"
          >
            Edit
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateCommentModal;
