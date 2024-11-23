import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import { updateUserDTO } from "@/utils/DTOs";
import bcrypt from "bcryptjs";
import { validationUpdateOwnUserProfileSchema } from "@/utils/validationSchema";
import { cookies } from "next/headers";

interface Props {
  params: { id: string };
}

/**
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @access private
 * @desc Delete a profile
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      include: { comments: true },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request);
    if (userFromToken !== null && userFromToken.id === user.id) {
      await prisma.user.delete({ where: { id: parseInt(params.id) } });
      const commentIds: number[] = user?.comments.map((comment) => comment.id);
      await prisma.comment.deleteMany({ where: { id: { in: commentIds } } });
      cookies().delete("jwtToken");
      return NextResponse.json(
        { message: "User has been deleted successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "Only user himself, access denied" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route ~/api/users/profile/:id
 * @access private
 * @desc Get user profile
 */
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "Not allowed, Only user himself" },
        { status: 403 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/users/profile/:id
 * @access private
 * @desc Update user info
 */
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "Not allowed, Only user himself" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as updateUserDTO;
    const validation = validationUpdateOwnUserProfileSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(params.id) },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });
    // const { password, ...others } = updatedUser;
    return NextResponse.json({ ...updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
