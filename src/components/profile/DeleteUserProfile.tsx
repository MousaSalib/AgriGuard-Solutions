"use client";

import React, { useState } from "react";
import { TiUserDelete } from "react-icons/ti";
import ConfirmPassword from "./ConfirmPassword";

interface DeleteUserProfileProps {
  params: { id: string };
  token: string;
  password: string;
}
const DeleteUserProfile = ({ params: { id } }: DeleteUserProfileProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setOpen(true)}
        className="pt-2 pb-2 ps-4 pe-4 rounded-lg bg-red-600 hover:bg-red-800 flex justify-center items-center font-bold cursor-pointer transition duration-300"
      >
        DELETE ACCOUNT
        <TiUserDelete size={22} className="ml-2" />
      </div>
      {open && <ConfirmPassword setOpen={setOpen} id={id} />}
    </div>
  );
};

export default DeleteUserProfile;
