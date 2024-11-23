"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "../Admin.module.css";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";

interface EditProductFormProps {
  product: Product;
}

const EditProductForm = ({ product }: EditProductFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);

  const categories = [
    "Dream pesticides",
    "Fungicides",
    "Nematicides",
    "Herbicides",
    "Termite pesticides",
    "Pesticide",
  ];

  const editProductFormSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");
    if (category === "") return toast.error("Category is required");
    if (Number(price) <= 0)
      return toast.error("Price must be greater than zero");
    if (Number(stock) <= 0)
      return toast.error("Quantity must be greater than zero");

    try {
      await axios.put(`${DOMAIN}/api/products/${product.id}`, {
        title,
        description,
        category,
        price,
        stock,
      });
      router.refresh();
      toast.success("Product updated successfully");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "An error occurred");
        console.log(error);
      } else {
        toast.error("An unexpected error occurred");
        console.error(error);
      }
    }
  };

  return (
    <form className="flex flex-col" onSubmit={editProductFormSubmitHandler}>
      <div className="mb-6">
        <input
          type="text"
          className="w-full text-xl font-semibold text-customGreen px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Edit Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <textarea
          className="w-full text-xl font-semibold text-customGreen px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          placeholder="Edit Product description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-6">
        <select
          className="w-full text-xl font-semibold text-customGreen px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <input
          type="number"
          className="w-full text-xl font-semibold text-customGreen px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Edit Product Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <div className="mb-6">
        <input
          type="number"
          className="w-full text-xl font-semibold text-customGreen px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Edit Product Stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />
      </div>
      <button
        type="submit"
        className={`${styles.addProductFormBTN} block text-xl w-full p-2 rounded-lg hover:bg-customGreenOnHover mt-2 text-center`}
      >
        Edit
      </button>
    </form>
  );
};

export default EditProductForm;
