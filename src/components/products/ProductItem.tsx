"use client";

import { Product } from "@prisma/client";
import Link from "next/link";
import styles from "./ProductItem.module.css";
import { motion } from "framer-motion";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const getFirstWords = (text: string, numWords: number) => {
    return (
      text.split(" ").slice(0, numWords).join(" ") +
      (text.split(" ").length > numWords ? "..." : "")
    );
  };

  return (
    <motion.div
      layout
      initial={{ transform: "scale(0)" }}
      animate={{ transform: "scale(1)" }}
      transition={{ type: "spring", damping: 8, stiffness: 50 }}
      className="w-full lg:w-1/4 md:w-2/5 m-3 bg-customGreen p-6 rounded-lg shadow"
      style={{
        border: "2px solid #ffff00",
      }}
    >
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold line-clamp-1">
            {getFirstWords(product.title, 4)}
          </h1>
          <h4 className="font-bold line-clamp-1" style={{ color: "#ffff00" }}>
            {product.category}
          </h4>
        </div>

        <span style={{ color: "#ffff00" }}>{product.price} EGP</span>
      </div>

      <p className="line-clamp-1">{getFirstWords(product.description, 5)}</p>

      <Link
        href={`/products/${product.id}`}
        className={`${styles.productItemBTN} block w-full p-2 rounded-lg hover:bg-customGreenOnHover mt-3 text-center`}
      >
        Details
      </Link>
    </motion.div>
  );
};

export default ProductItem;
