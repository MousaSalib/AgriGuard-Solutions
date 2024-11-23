"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteProductProps {
  productId: number;
}
const DeleteProduct = ({ productId }: DeleteProductProps) => {
  const router = useRouter();

  const deleteProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (confirm("Are you sure, that you want to delete this product?")) {
        await axios.delete(`${DOMAIN}/api/products/${productId}`);
        router.refresh();
        toast.success("Product has been deleted successfully!");
      }
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
    <div>
      <div
        onClick={deleteProduct}
        className="pt-2 pb-2 ps-4 pe-4 rounded-lg bg-red-600 hover:bg-red-800 cursor-pointer transition duration-300"
      >
        DELETE
      </div>
    </div>
  );
};

export default DeleteProduct;
