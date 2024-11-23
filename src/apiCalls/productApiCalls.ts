import { DOMAIN } from "@/utils/constants";
import { SingleProduct } from "@/utils/types";
import { Product } from "@prisma/client";

// Get Products Based On PageNumber
export async function getProducts(
  pageNumber: string | undefined
): Promise<Product[]> {
  const response = await fetch(
    `http://localhost:3000/api/products?pageNumber=${pageNumber}`, {
      cache: "no-store"
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Products");
  }

  return response.json();
}

// Get Products Count
// export async function getProductsCount(): Promise<number> {
//   const response = await fetch(`http://localhost:3000/api/products/count`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch Products Count");
//   }
//   const { count } = (await response.json()) as { count: number };
//   return count;
// }

// Get Products Based On Search
export async function getProductsBasedOnSearch(
  searchText: string
): Promise<Product[]> {
  const response = await fetch(
    `http://localhost:3000/api/products/search?searchText=${searchText}`, {
      cache: "no-store"
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Products");
  }

  return response.json();
}

// Get Single Products
export async function getSingleProduct(
  productId: string
): Promise<SingleProduct> {
  const response = await fetch(`${DOMAIN}/api/products/${productId}`, {
    cache: "no-store"
  });
  if (!response) {
    throw new Error("Failed to fetch Single Product");
  }
  return response.json();
}
