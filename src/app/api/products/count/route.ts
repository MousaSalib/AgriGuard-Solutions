import prisma from "@/utils/db";
import {  NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/products/count
 * @access public
 * @desc Get the number of products
 */
export async function GET() {
  try {
    const count = await prisma.product.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
