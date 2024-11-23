import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/products/search?searchText=value
 * @access public
 * @desc Search for products
 */
export async function GET(request: NextRequest) {
  try {
    const searchText = request.nextUrl.searchParams.get("searchText");
    let products;
    if (searchText) {
      products = await prisma.product.findMany({
        where: {
          title: {
            startsWith: searchText,
            mode: "insensitive",
          },
        },
      });
    } else {
      products = await prisma.product.findMany({ take: 6 });
    }
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
