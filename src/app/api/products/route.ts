import { PRODUCT_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";
import { createProductsDTO } from "@/utils/DTOs";
import { validationProductsSchema } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import { Product } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/products
 * @access public
 * @desc Get the products based on the pageNumber
 */
export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
    const products = await prisma.product.findMany({
      skip: PRODUCT_PER_PAGE * (parseInt(pageNumber) - 1),
      take: PRODUCT_PER_PAGE,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method POST
 * @route ~/api/products
 * @access private (Only admin can create a new product)
 * @desc Create New Product
 */
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "Only admin, access denied" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as createProductsDTO;
    const validation = validationProductsSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const newProduct: Product = await prisma.product.create({
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        price: body.price,
        stock: body.stock,
      },
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
