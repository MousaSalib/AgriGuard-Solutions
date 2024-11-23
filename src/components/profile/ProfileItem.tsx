"use client";

import { User } from "@prisma/client";
import UpdateUserProfile from "./UpdateUserProfile";
import DeleteUserProfile from "./DeleteUserProfile";
import { motion } from "framer-motion";

interface ProfileItemProps {
  user: User;
  token: string;
  id: string;
}
const ProfileItem = ({ user, token, id }: ProfileItemProps) => {
  return (
    <motion.div
      layout
      initial={{ transform: "scale(0)" }}
      animate={{ transform: "scale(1)" }}
      transition={{ type: "spring", damping: 8, stiffness: 50 }}
      className="bg-customGreen w-full rounded-lg mt-3 mb-3 shadow-lg p-6 flex items-center space-x-6"
      style={{ border: "2px solid #ffff00" }}
    >
      <div
        className=" text-customGreen font-bold rounded-full h-20 w-20 flex items-center justify-center text-3xl shadow-lg border-4 border-white"
        title={user.username}
        style={{ background: "#ffff00" }}
      >
        {user.username?.charAt(0).toUpperCase()}
      </div>

      <div className="flex flex-col space-y-3">
        <h1 className="text-4xl font-bold text-white">{user.username}</h1>
        <div>
          <span className="font-bold text-2xl">Email:</span>
          <p className="font-semibold text-blue-500">{user.email}</p>
        </div>
        <div>
          <span className="font-bold text-2xl">Joined On:</span>
          <p className="font-semibold" style={{ color: "#ffff00" }}>
          {new Date(user.createdAt).toLocaleDateString("en-US")}
          </p>
        </div>
        <div>
          <span className="font-bold text-2xl">Role:</span>{" "}
          {user.isAdmin ? (
            <span className="text-green-500 font-semibold">Admin</span>
          ) : (
            <span className="text-blue-500 font-semibold">Regular User</span>
          )}
        </div>
        <div className="flex justify-center items-center gap-5">
          <UpdateUserProfile user={user} />
          <DeleteUserProfile
            params={{ id }}
            token={token}
            password={user.password}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileItem;
