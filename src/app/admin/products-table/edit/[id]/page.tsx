import { getSingleProduct } from "@/apiCalls/productApiCalls";
import EditProductForm from "@/components/admin/products/EditProductForm";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Product } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface EditProductProps {
  params: { id: string };
}

const EditProduct = async ({ params }: EditProductProps) => {
  const token = cookies().get("jwtToken")?.value;
  if (!token) redirect("/");
  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");

  const product: Product = await getSingleProduct(params.id);
  return (
    <section className="flex items-center justify-center px-5 lg:px-20">
      <div
        className="shadow p-4 mt-3 bg-customGreen rounded w-full"
        style={{
          border: "2px solid #ffff00",
        }}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-3"
          style={{ color: "#ffff00" }}
        >
          Edit Product
        </h2>
        <EditProductForm product={product} />
      </div>
    </section>
  );
};

export default EditProduct;
