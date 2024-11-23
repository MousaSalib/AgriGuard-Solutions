"use client";

import { CommentWithUser } from "@/utils/types";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import UpdateCommentModal from "./UpdateCommentModal";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";

interface CommentsProps {
  comment: CommentWithUser;
  userId: number | undefined;
}
const Comments = ({ comment, userId }: CommentsProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const deleteComment = async () => {
    try {
      if (confirm("Are you sure, you want to delete this comment?")) {
        await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
        router.refresh();
        toast.success("Comment has been deleted successfully!");
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
    <section
      className="container mx-auto my-auto px-4 w-full sm:w-full md:w-2/3 lg:w-full mb-3 bg-customGreen mt-3 rounded-lg"
      style={{
        border: "2px solid #ffff00",
      }}
    >
      <div className="py-6 px-4 sm:py-8 sm:px-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">{comment.user.username}</h1>
          <p className="text-xl">{comment.text}</p>
        </div>
        <div>
          <p
            className="bg-customGreenOnHover pt-1 pb-1 ps-2 pe-2 rounded-lg"
            style={{
              border: "2px solid #ffff00",
            }}
          >
            {new Date(comment.createdAt).toDateString()}
          </p>
          {userId && userId === comment.userId && (
            <div className="flex justify-between items-center text-2xl mt-2">
              <span className="cursor-pointer text-yellow-400">
                <FaEdit onClick={() => setOpen(true)} />
              </span>
              <span
                className="cursor-pointer text-red-600"
                onClick={deleteComment}
              >
                <FaTrash />
              </span>
            </div>
          )}
        </div>
      </div>
      {open && (
        <UpdateCommentModal
          setOpen={setOpen}
          commentId={comment.id}
          text={comment.text}
        />
      )}
    </section>
  );
};

export default Comments;
