import { z } from "zod";

// Validation Create Product
export const validationProductsSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title should be of type string",
    })
    .min(2, { message: "Title must be at least 2 characters" })
    .max(200, { message: "Title must be less than 200 characters" }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description should be of type string",
    })
    .min(10, { message: "Description must be at least 10 characters" }),
  category: z
    .string({
      required_error: "Category is required",
      invalid_type_error: "Category should be of type string",
    })
    .min(2, { message: "Category must be at least 2 characters" })
    .max(200, { message: "Category must be less than 200 characters" }),
  price: z.number({
    required_error: "Price is required",
    invalid_type_error: "Price should be of type number",
  }),
  stock: z.number({
    required_error: "Stock is required",
    invalid_type_error: "Stock should be of type number",
  }),
});

export const validationRegisterUserSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username should be of type string",
    })
    .min(2, {
      message: "Username must be at least 2 characters",
    })
    .max(100, {
      message: "Username must be less than 100 characters",
    }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be of type string",
    })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(300, {
      message: "Email must be less than 300 characters",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password should be of type string",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

export const validationLoginUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be of type string",
    })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(300, {
      message: "Email must be less than 300 characters",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password should be of type string",
    })
    .min(3, {
      message: "Password must be at least 3 characters",
    }),
});

export const validationCreateNewCommentSchema = z.object({
  text: z
    .string({
      required_error: "Text is required",
      invalid_type_error: "Text should be of type string",
    })
    .min(2, { message: "Text must be at least 2 character" })
    .max(500, { message: "Text must be less than 500 characters" }),
  productId: z.number({ required_error: "Product ID is required" }),
});

export const validationUpdateOwnUserProfileSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username should be of type string",
    })
    .min(2, {
      message: "Username must be at least 2 characters",
    })
    .max(100, {
      message: "Username must be less than 100 characters",
    })
    .optional(),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be of type string",
    })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(300, {
      message: "Email must be less than 300 characters",
    })
    .email()
    .optional(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password should be of type string",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .optional(),
});

export const validationUpdateCommentSchema = z.object({
  text: z
    .string({
      required_error: "Text is required",
      invalid_type_error: "Text should be of type string",
    })
    .min(2, { message: "Text must be at least 2 character" })
    .max(500, { message: "Text must be less than 500 characters" })
    .optional(),
});
