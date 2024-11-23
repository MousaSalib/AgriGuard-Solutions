import { Comment, Product, User } from "@prisma/client";

export type JWTPayload = {
  id: number;
  username: string;
  isAdmin: boolean;
};

export type CommentWithUser = Comment & { user: User };
export type SingleProduct = Product & { comments: CommentWithUser[] };
