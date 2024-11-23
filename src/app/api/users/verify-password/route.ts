import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

/**
 * @method POST
 * @route ~/api/users/verify-password
 * @access private
 * @desc Verify password before performing sensitive operations
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, password } = body;
    if (!id || !password) {
      return NextResponse.json(
        { message: "Password is required to can delete your account." },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Password is incorrect." },
        { status: 401 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error verifying password:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
