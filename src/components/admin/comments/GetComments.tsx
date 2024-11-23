"use client";

import { motion } from "framer-motion";
import DeleteComments from "../products/DeleteComments";
import { Comment } from "@prisma/client";

interface GetCommentsProps {
  comments: Comment[];
}
const GetComments = ({ comments }: GetCommentsProps) => {
  return (
    <motion.div
      layout
      initial={{ transform: "scale(0)" }}
      animate={{ transform: "scale(1)" }}
      transition={{ type: "spring", damping: 8, stiffness: 50 }}
    >
      <table
        className="border-collapse bg-customGreen rounded-lg shadow-lg"
        style={{ border: "4px solid #ffff00", width: "98%" }}
      >
        <thead>
          <tr>
            <th className="p-4" style={{ border: "4px solid #ffff00" }}>
              Owner ID
            </th>
            <th className="p-4" style={{ border: "4px solid #ffff00" }}>
              Comment
            </th>
            <th className="p-4" style={{ border: "4px solid #ffff00" }}>
              Created At
            </th>
            <th className="p-4" style={{ border: "4px solid #ffff00" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr
              key={comment.id}
              className="text-center bg-customGreen font-semibold"
            >
              <td className="p-4" style={{ border: "2px solid #ffff00" }}>
                {comment.userId}
              </td>
              <td className="p-4" style={{ border: "2px solid #ffff00" }}>
                {comment.text}
              </td>
              <td className="p-4" style={{ border: "2px solid #ffff00" }}>
                {new Date(comment.createdAt).toLocaleDateString()}
              </td>
              <td
                className="p-4 border"
                style={{ border: "2px solid #ffff00" }}
              >
                <div className="flex justify-center gap-2">
                  <DeleteComments commentId={comment.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default GetComments;
