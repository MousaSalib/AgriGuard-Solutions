"use client";

import Link from "next/link";

interface ProductsErrorPageProps {
  error: Error;
  reset: () => void;
}

const ProductsErrorPage = ({ error, reset }: ProductsErrorPageProps) => {
  return (
    <div className="text-center pt-7">
      <div>
        <h1 className="text-red-500 font-bold text-3xl">
          Something Went Wrong While Fetching Products
        </h1>
        <p className="text-black font-semibold mt-7 text-xl">
          Error Message: {error.message}
        </p>
        <button
          onClick={() => reset()}
          className=" bg-blue-500 p-2 rounded-lg mt-7"
        >
          Try again
        </button>
        <div className=" text-xl underline text-blue-600 mt-12">
          <Link href={"/"}>GO TO HOME PAGE</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductsErrorPage;