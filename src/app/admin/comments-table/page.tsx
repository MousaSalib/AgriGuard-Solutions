import { getAllComments } from "@/apiCalls/adminApiCalls";
import GetComments from "@/components/admin/comments/GetComments";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Comment } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const CommentsTable = async () => {
  const token = cookies().get("jwtToken")?.value;
  if (!token) redirect("/");

  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");

  const comments: Comment[] = await getAllComments(token);

  return (
    <section className="mt-3 mb-3">
      <div className="flex justify-center items-center mb-3">
        <div
          className="bg-customGreen rounded-lg"
          style={{ border: "2px #ffff00 solid" }}
        >
          <h1
            className="text-4xl text-center p-3 font-extrabold"
            style={{ color: "#ffff00" }}
          >
            Admin Comments Table
          </h1>
        </div>
      </div>
      <div className="flex justify-center mb-3 overflow-x-auto">
        <div className="w-full" style={{ maxWidth: "98%" }}>
          <GetComments comments={comments} />
        </div>
      </div>
    </section>
  );
};

export default CommentsTable;
