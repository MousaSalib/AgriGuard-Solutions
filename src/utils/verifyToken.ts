import { NextRequest } from "next/server";
import { JWTPayload } from "./types";
import jwt from "jsonwebtoken";

// Verify Token For APIs
export function verifyToken(request: NextRequest): JWTPayload | null {
  try {
    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;
    if (!token) return null;
    const privateKey = process.env.SECRET_KEY as string;
    const userPayload = jwt.verify(token, privateKey) as JWTPayload;
    return userPayload;
  } catch (error) {
    return null;
  }
}

//Verify Token For Pages
export function verifyTokenForPage(token: string): JWTPayload | null {
  try {
    const privateKey = process.env.SECRET_KEY as string;
    const userPayload = jwt.verify(token, privateKey) as JWTPayload;
    if (!userPayload) return null;
    return userPayload;
  } catch (error) {
    return null;
  }
}
