"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import styles from "../Admin.module.css";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";

const AddProductForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const categories = [
    "Dream pesticides",
    "Fungicides",
    "Nematicides",
    "Herbicides",
    "Termite pesticides",
    "Pesticide",
  ];

  const addProductFormSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");
    if (category === "") return toast.error("Category is required");
    if (price === "") {
      return toast.error("Price is required");
    } else if (isNaN(Number(price))) {
      return toast.error("Price must be of type number");
    } else if (Number(price) <= 0) {
      return toast.error("Price must be greater than zero");
    }
    if (stock === "") {
      return toast.error("Quantity is required");
    } else if (isNaN(Number(stock))) {
      return toast.error("Quantity must be of type number");
    } else if (Number(stock) <= 0) {
      return toast.error("Quantity must be greater than zero");
    }
    try {
      await axios.post(`${DOMAIN}/api/products`, {
        title,
        description,
        category,
        price: Number(price),
        stock: Number(stock),
      });
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setStock("");
      router.refresh();
      toast.success("Product added successfully!");
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
    <form onSubmit={addProductFormSubmitHandler} className="flex flex-col">
      <div className="mb-6">
        <input
          type="text"
          className="w-full text-xl font-semibold text-customGreen px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <textarea
          className="w-full text-xl font-semibold text-customGreen px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          placeholder="Enter Product description"
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
      <div className="mb-6 relative">
        <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-xl text-gray-500">
          EGP
        </span>
        <input
          type="number"
          className="w-full text-xl font-semibold text-customGreen px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <input
          type="number"
          className="w-full text-xl font-semibold text-customGreen px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter Stock Quantity"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className={`${styles.addProductFormBTN} block text-xl w-full p-2 rounded-lg hover:bg-customGreenOnHover mt-2 text-center`}
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
