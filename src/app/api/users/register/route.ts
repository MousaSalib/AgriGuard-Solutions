import { registerUserDTO } from "@/utils/DTOs";
import { validationRegisterUserSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { JWTPayload } from "@/utils/types";
import { setCookie } from "@/utils/generateToken";

/**
 * @method POST
 * @route ~/api/users/register
 * @access public
 * @desc Create User Account
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as registerUserDTO;
    const validation = validationRegisterUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
      return NextResponse.json(
        { message: "User already exist!" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
        isAdmin: false,
      },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
      },
    });

    const jwtPayload: JWTPayload = {
      id: newUser.id,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
    };
    const cookie = setCookie(jwtPayload);
    return NextResponse.json(
      { ...newUser, message: "Registered successfully" },
      {
        status: 201,
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
