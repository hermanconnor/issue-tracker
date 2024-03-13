import { z } from "zod";
import { Status } from "@prisma/client";

// SIGN UP
export const SignupFormSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(1, { message: "Name is required" })
      .max(255),
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .min(1, { message: "Email is required" })
      .max(255)
      .email(),

    password: z
      .string({ required_error: "Password is required" })
      .min(1, { message: "Password is required" })
      .max(255),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignupFormType = z.infer<typeof SignupFormSchema>;

// SIGN IN
export const SigninFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .trim()
    .email(),

  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Pasword is required" }),
});

export type SigninFormType = z.infer<typeof SigninFormSchema>;

// ISSUE FORM
export const IssueSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title must be less than 255 characters" }),
  description: z
    .string({ required_error: "Description is required" })
    .trim()
    .min(1, { message: "Description is required" })
    .max(65535),
  status: z
    .nativeEnum(Status, {
      errorMap: (issue, ctx) => {
        return { message: "Status is required" };
      },
    })
    .default(Status.OPEN),
});

export type IssueFormType = z.infer<typeof IssueSchema>;

// EDIT ISSUE FORM
export const EditIssueSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title must be less than 255 characters" })
    .optional(),

  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description is required" })
    .max(65535)
    .optional(),

  userId: z
    .string()
    .min(1, { message: "UserId is required" })
    .max(255)
    .optional()
    .nullable(),

  status: z.nativeEnum(Status).optional(),
});
