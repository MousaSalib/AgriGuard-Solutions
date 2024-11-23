import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/users/logout
 * @access public
 * @desc Logout from the user account
 */
export function GET() {
  try {
    cookies().delete("jwtToken");
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
