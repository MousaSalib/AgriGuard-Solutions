"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const ProductsSearchInput = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const searchProductsFormSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (searchText === "") return toast.error("Please enter your search text");
    router.push(`/products/search?searchText=${searchText}`);
  };
  return (
    <div className="mx-3">
      <form
        onSubmit={searchProductsFormSubmitHandler}
        className="w-full lg:w-3/4 md:w-4/5 mt-3 bg-customGreen mx-auto p-2 rounded-lg flex justify-center gap-1"
        style={{
          border: "2px solid #ffff00",
        }}
      >
        <input
          type="text"
          className="w-full text-xl font-semibold text-customGreen px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for products..."
        />
        <button type="submit" className="ml-3 px-4 py-2 text-white rounded-lg">
          Search
        </button>
      </form>
    </div>
  );
};

export default ProductsSearchInput;
