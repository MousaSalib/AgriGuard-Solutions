import prisma from "@/utils/db";
import { updateProductDTO } from "@/utils/DTOs";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

/**
 * @method GET
 * @route ~/api/products/:id
 * @access public
 * @desc Get Single Product
 */
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/products/:id
 * @access private (Only admin can update the products)
 * @desc Update Product
 */
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (user === null || !user.isAdmin) {
      return NextResponse.json(
        { message: "Not allowed, Only admin" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as updateProductDTO;
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        price: body.price,
        stock: body.stock,
      },
    });
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/products/:id
 * @access private (Only admin can delete the product)
 * @desc Delete Product
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comments: true,
      },
    });
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (user === null || !user.isAdmin) {
      return NextResponse.json(
        { message: "Not allowed, Only admin" },
        { status: 403 }
      );
    }
    await prisma.product.delete({ where: { id: parseInt(params.id) } });
    const commentIds = product?.comments.map((comment) => comment.id);
    await prisma.comment.deleteMany({ where: { id: { in: commentIds } } });
    return NextResponse.json(
      { message: "Product has been deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
