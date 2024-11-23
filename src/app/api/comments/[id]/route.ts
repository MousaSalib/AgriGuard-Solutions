import prisma from "@/utils/db";
import { updateCommentDTO } from "@/utils/DTOs";
import { validationUpdateCommentSchema } from "@/utils/validationSchema";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

/**
 * @method PUT
 * @route ~/api/comments/:id
 * @access private (Only the owner of comment)
 * @desc Update a comment
 */
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (user === null || user.id !== comment.userId) {
      return NextResponse.json(
        { message: "Not allowed, access denied" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as updateCommentDTO;
    const validation = validationUpdateCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(params.id) },
      data: {
        text: body.text,
      },
    });
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/comments/:id
 * @access private (Only the owner or the admin can delete the comment)
 * @desc Delete a comment
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (user === null) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }
    if (user.id === comment.userId || user.isAdmin === true) {
      await prisma.comment.delete({ where: { id: parseInt(params.id) } });
      return NextResponse.json(
        { message: "Comment has been deleted successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "Not allowed, access denied" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
