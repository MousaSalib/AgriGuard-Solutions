import AddProductForm from "@/components/admin/products/AddProductForm";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AdminPage = () => {
  const token = cookies().get("jwtToken")?.value as string;
  if (!token) redirect("/");
  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");
  return (
    <div className="flex items-center justify-center px-5 lg:px-20 mb-3">
      <div
        className="shadow p-4 mt-3 bg-customGreen rounded w-full"
        style={{
          border: "4px solid #ffff00",
        }}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-3"
          style={{ color: "#ffff00" }}
        >
          Add New Product
        </h2>
        <AddProductForm />
      </div>
    </div>
  );
};

export default AdminPage;
