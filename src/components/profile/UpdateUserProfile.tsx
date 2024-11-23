"use client";

import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import UpdateUserProfileModal from "./UpdateUserProfileModal";
import { User } from "@prisma/client";

interface UpdateUserProfileProps {
  user: User;
}
const UpdateUserProfile = ({ user }: UpdateUserProfileProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div
        onClick={() => setOpen(true)}
        className="relative bg-blue-600 hover:bg-blue-700 flex justify-center items-center text-white text-center font-bold cursor-pointer rounded-lg px-4 py-2 transition duration-300"
      >
        Edit
        <FaUserEdit size={22} className="ml-2" />
      </div>
      {open && <UpdateUserProfileModal setOpen={setOpen} user={user} />}
    </div>
  );
};

export default UpdateUserProfile;
