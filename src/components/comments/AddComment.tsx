"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface AddCommentProps {
  productId: number;
}
const AddComment = ({ productId }: AddCommentProps) => {
  const [text, setText] = useState("");
  const router = useRouter();

  const addCommentFormSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text === "") {
      return toast.error("Please enter a comment");
    }
    try {
      await axios.post(`${DOMAIN}/api/comments`, { text, productId });

      setText("");
      router.refresh();
      toast.success("Comment added successfully!");
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
    <form
      onSubmit={addCommentFormSubmitHandler}
      className="container bg-customGreen p-2 mx-auto w-full sm:w-full md:w-2/3 lg:w-full mt-3 rounded-lg"
      style={{
        border: "2px solid #ffff00",
      }}
    >
      <input
        type="text"
        className="w-full text-xl font-semibold text-customGreen px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        placeholder="Add A Comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="block w-full p-2 rounded-lg hover:bg-customGreenOnHover mt-3 text-center"
      >
        Comment
      </button>
    </form>
  );
};

export default AddComment;
