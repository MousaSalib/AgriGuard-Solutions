"use client";

import { useState, useEffect } from "react";
import styles from "./ProductItem.module.css";
import { Product } from "@prisma/client";
import { getProducts } from "@/apiCalls/productApiCalls";
import ProductItem from "./ProductItem";

interface CategoryProps {
  searchParams: { pageNumber?: string }; // Make pageNumber optional
}

const Category = ({ searchParams }: CategoryProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentActive, setCurrentActive] = useState("All");

  const pageNumber = searchParams.pageNumber || "1"; // Default to "1" if undefined

  // Fetch products based on the page number
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts(pageNumber);
      setProducts(products);
    };

    fetchProducts();
  }, [pageNumber]); // Only re-fetch if pageNumber changes

  // Apply filtering whenever the products or currentActive changes
  useEffect(() => {
    if (currentActive === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((item) => item.category === currentActive);
      setFilteredProducts(filtered);
    }
  }, [currentActive, products]); // Re-filter when products or the active category changes

  const handleClick = (btnCategory: string) => {
    setCurrentActive(btnCategory); // Set the active category
  };

  return (
    <div className="flex flex-wrap justify-center items-center mt-3 gap-2">
      {/* Category Filters */}
      <div
        onClick={() => handleClick("All")}
        className={`${
          currentActive === "All" ? styles.active : ""
        } bg-customGreen p-2 text-center rounded-lg mb-3 text-xl cursor-pointer`}
      >
        All Products
      </div>
      <div
        onClick={() => handleClick("Dream Pesticides")}
        className={`${
          currentActive === "Dream Pesticides" ? styles.active : ""
        } bg-customGreen p-2 text-center rounded-lg mb-3 text-xl cursor-pointer`}
      >
        Dream Pesticides
      </div>
      <div
        onClick={() => handleClick("Fungicides")}
        className={`${
          currentActive === "Fungicides" ? styles.active : ""
        } bg-customGreen p-2 text-center rounded-lg mb-3 text-xl cursor-pointer`}
      >
        Fungicides
      </div>
      <div
        onClick={() => handleClick("Herbicides")}
        className={`${
          currentActive === "Herbicides" ? styles.active : ""
        } bg-customGreen p-2 text-center rounded-lg mb-3 text-xl cursor-pointer`}
      >
        Herbicides
      </div>
      <div
        onClick={() => handleClick("Termite Pesticides")}
        className={`${
          currentActive === "Termite Pesticides" ? styles.active : ""
        } bg-customGreen p-2 text-center rounded-lg mb-3 text-xl cursor-pointer`}
      >
        Termite Pesticides
      </div>
      <div
        onClick={() => handleClick("Pesticide")}
        className={`${
          currentActive === "Pesticide" ? styles.active : ""
        } bg-customGreen p-2 text-center rounded-lg mb-3 text-xl cursor-pointer`}
      >
        Pesticide
      </div>

      {/* Display filtered products */}
      <div className="flex justify-center flex-wrap gap-1">
        {filteredProducts.map((item) => (
          <ProductItem product={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Category;
