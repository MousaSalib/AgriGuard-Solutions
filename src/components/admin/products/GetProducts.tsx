"use client";

import Link from "next/link";
import DeleteProduct from "./DeleteProduct";
import { Product } from "@prisma/client";
import { motion } from "framer-motion";

interface GetProductsProps {
  products: Product[];
}
const GetProducts = ({ products }: GetProductsProps) => {
  return (
    <motion.div
      layout
      initial={{ transform: "scale(0)" }}
      animate={{ transform: "scale(1)" }}
      transition={{ type: "spring", damping: 8, stiffness: 50 }}
      className="w-full"
      style={{ maxWidth: "98%" }}
    >
      <table
        className="border-collapse bg-customGreen rounded-lg shadow-lg"
        style={{ border: "4px solid #ffff00", width: "98%" }}
      >
        <thead>
          <tr>
            <th className="p-4" style={{ border: "4px solid #ffff00" }}>
              Title
            </th>
            <th className="p-4" style={{ border: "4px solid #ffff00" }}>
              Category
            </th>
            <th className="p-4" style={{ border: "4px solid #ffff00" }}>
              Price
            </th>
            <th className="p-4" style={{ border: "4px solid #ffff00" }}>
              Quantity
            </th>
            <th className="p-4" style={{ border: "4px solid #ffff00" }}>
              Created At
            </th>
            <th className="p-4" style={{ border: "4px solid #ffff00" }}>
              Actions
            </th>
            <th className="p-4" style={{ border: "4px solid #ffff00" }}>
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="text-center bg-customGreen font-semibold"
            >
              <td className="p-4" style={{ border: "2px solid #ffff00" }}>
                {product.title}
              </td>
              <td className="p-4" style={{ border: "2px solid #ffff00" }}>
                {product.category}
              </td>
              <td className="p-4" style={{ border: "2px solid #ffff00" }}>
                {product.price} EGP
              </td>
              <td className="p-4" style={{ border: "2px solid #ffff00" }}>
                {product.stock}
              </td>
              <td className="p-4" style={{ border: "2px solid #ffff00" }}>
                {new Date(product.createdAt).toLocaleDateString()}
              </td>
              <td
                className="p-4 border"
                style={{ border: "2px solid #ffff00" }}
              >
                <div className="flex justify-center gap-2">
                  <Link
                    href={`/admin/products-table/edit/${product.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition duration-300"
                  >
                    EDIT
                  </Link>
                  <DeleteProduct productId={product.id} />
                </div>
              </td>
              <td className="p-4" style={{ border: "2px solid #ffff00" }}>
                <Link
                  href={`/products/${product.id}`}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 transition duration-300"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default GetProducts;
