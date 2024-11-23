import { getProducts } from "@/apiCalls/productApiCalls";
import GetProducts from "@/components/admin/products/GetProducts";
import Pagination from "@/components/products/Pagination";
import { PRODUCT_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Product } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ProductsTableProps {
  searchParams: { pageNumber: string };
}

const ProductsTable = async ({ searchParams }: ProductsTableProps) => {
  const token = cookies().get("jwtToken")?.value;
  if (!token) redirect("/");

  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");

  const pageNumber = searchParams.pageNumber || "1";
  const products: Product[] = await getProducts(pageNumber);
  const count: number = await prisma.product.count();
  const pages = Math.ceil(count / PRODUCT_PER_PAGE);

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
            Admin Products Table
          </h1>
        </div>
      </div>
      <div className="flex justify-center mb-3 overflow-x-auto">
        <GetProducts products={products} />
      </div>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        pages={pages}
        route="/admin/products-table"
      />
    </section>
  );
};

export default ProductsTable;
