import { getProducts } from "@/apiCalls/productApiCalls";
import Pagination from "@/components/products/Pagination";
import ProductItem from "@/components/products/ProductItem";
import ProductsSearchInput from "@/components/products/ProductsSearchInput";
import { PRODUCT_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";
import { Product } from "@prisma/client";
import { AnimatePresence } from "framer-motion";

interface ProductsPageProps {
  searchParams: { pageNumber: string };
}
const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const { pageNumber } = searchParams;
  const products: Product[] = await getProducts(pageNumber);
  const count: number = await prisma.product.count();
  const pages = Math.ceil(count / PRODUCT_PER_PAGE);

  return (
    <section>
      <div className="mx-auto mb-3">
        <ProductsSearchInput />
        <div className="flex justify-center flex-wrap gap-1">
          <AnimatePresence>
            {products.map((item) => (
              <ProductItem product={item} key={item.id} />
            ))}
          </AnimatePresence>
        </div>
      </div>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        route="/products"
        pages={pages}
      />
    </section>
  );
};

export default ProductsPage;
