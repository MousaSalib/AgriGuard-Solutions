import prisma from "@/utils/db";
import { loginUserDTO } from "@/utils/DTOs";
import { validationLoginUserSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { JWTPayload } from "@/utils/types";
import { setCookie } from "@/utils/generateToken";

/**
 * @method POST
 * @route ~/api/users/login
 * @access public
 * @desc Login User
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as loginUserDTO;
    const validation = validationLoginUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid Email or Password" },
        { status: 404 }
      );
    }
    const isPasswordMatch = await bcrypt.compare(body.password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid Email or Password" },
        { status: 401 }
      );
    }
    const jwtPayload: JWTPayload = {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    };
    const cookie = setCookie(jwtPayload);
    return NextResponse.json(
      { message: "Logged in successfully" },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
