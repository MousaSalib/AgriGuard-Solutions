import { getProductsBasedOnSearch } from "@/apiCalls/productApiCalls";
import ProductItem from "@/components/products/ProductItem";
import { Product } from "@prisma/client";

interface SearchProductsProps {
  searchParams: { searchText: string };
}
const SearchProductsPage = async ({
  searchParams: { searchText },
}: SearchProductsProps) => {
  const products: Product[] = await getProductsBasedOnSearch(searchText);
  return (
    <section className="mt-3 flex justify-center flex-col">
      {products.length === 0 ? (
        <div className="flex justify-center">
          <h1
            className="text-center text-4xl font-extrabold bg-customGreen p-3 rounded-lg inline-block"
            style={{
              border: "2px solid #ffff00",
            }}
          >
            Products Of{" "}
            <span style={{ color: "#ffff00" }}>
              {searchText}{" "}
              <span className=" text-red-700 text-4xl font-extrabold">
                Not-Found
              </span>
            </span>
          </h1>
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <h1
              className="text-center text-4xl font-extrabold bg-customGreen p-3 rounded-lg inline-block"
              style={{
                border: "2px solid #ffff00",
              }}
            >
              Products Based On{" "}
              <span style={{ color: "#ffff00" }}>{searchText}</span>
            </h1>
          </div>
          <div className="flex justify-center flex-wrap gap-1">
            {products.map((item) => (
              <ProductItem key={item.id} product={item} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default SearchProductsPage;
