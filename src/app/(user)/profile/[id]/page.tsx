import { getUserProfile } from "@/apiCalls/userApiCalls";
import ProfileItem from "@/components/profile/ProfileItem";
import { User } from "@prisma/client";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface UserProfilePageProps {
  params: { id: string };
}

const UserProfilePage = async ({ params: { id } }: UserProfilePageProps) => {
  const token = cookies().get("jwtToken")?.value;
  if (!token) redirect("/");

  const user: User = await getUserProfile(id, token);

  return (
    <section className="container mx-auto px-4 w-full sm:w-full md:w-2/3 lg:w-1/2 mb-3 mt-3">
      <div
        className="bg-customGreen rounded-lg"
        style={{ border: "2px #ffff00 solid" }}
      >
        <h1
          className="text-4xl text-center p-3 font-extrabold"
          style={{ color: "#ffff00" }}
        >
          User Profile
        </h1>
      </div>
      <ProfileItem user={user} token={token} id={id}/>
    </section>
  );
};

export default UserProfilePage;
