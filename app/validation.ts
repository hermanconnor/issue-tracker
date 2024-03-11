import { z } from "zod";

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
