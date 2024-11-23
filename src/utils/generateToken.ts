import { serialize } from "cookie";
import { JWTPayload } from "./types";
import jwt from "jsonwebtoken";

// Generate A Token
export function generateToken(jwtPayload: JWTPayload): string {
  const privateKey = process.env.SECRET_KEY as string;
  const token = jwt.sign(jwtPayload, privateKey);
  return token;
}

// Set The Token In The Cookie
export function setCookie(jwtPayload: JWTPayload): string {
  const token = generateToken(jwtPayload);

  const cookie = serialize("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return cookie;
}
