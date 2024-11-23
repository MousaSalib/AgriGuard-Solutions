"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteCommentsProps {
  commentId: number;
}
const DeleteComments = ({ commentId }: DeleteCommentsProps) => {
  const router = useRouter();
  const handleDeleteComment = async () => {
    try {
      if (confirm("Are you sure you want to delete this comment?")) {
        await axios.delete(`${DOMAIN}/api/comments/${commentId}`);
        router.refresh();
        toast.success("Comment deleted successfully!");
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
    <div>
      <div
        onClick={handleDeleteComment}
        className="pt-2 pb-2 ps-4 pe-4 rounded-lg bg-red-600 hover:bg-red-800 cursor-pointer transition duration-300"
      >
        DELETE
      </div>
    </div>
  );
};

export default DeleteComments;
