import { getUserProfile } from "@/apiCalls/userApiCalls";
import { cookies } from "next/headers";

interface HeaderUsernameProps {
  userId: string;
}
const HeaderUsername = async ({ userId }: HeaderUsernameProps) => {
  const token = cookies().get("jwtToken")?.value || "";
  const user = await getUserProfile(userId, token);
  return (
    <div>
      <span
        className="h-12 w-12 font-bold rounded-full text-customGreen border-2 border-white flex items-center justify-center"
        style={{ backgroundColor: "#ffff00" }}
      >
        {user.username.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};

export default HeaderUsername;
