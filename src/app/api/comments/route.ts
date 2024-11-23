import prisma from "@/utils/db";
import { createNewCommentDTO } from "@/utils/DTOs";
import { validationCreateNewCommentSchema } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method POST
 * @route ~/api/comments
 * @access private (Only login user)
 * @desc Create a comment
 */
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "No token provided, Only login user" },
        { status: 401 }
      );
    }
    const body = (await request.json()) as createNewCommentDTO;
    const validation = validationCreateNewCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const product = await prisma.product.findUnique({
      where: { id: body.productId },
    });
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        productId: body.productId,
        userId: user.id,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route ~/api/comments
 * @access private (Only admin)
 * @desc Get all comments
 */
export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "Only admin, access denied" },
        { status: 403 }
      );
    }
    const comments = await prisma.comment.findMany();
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
