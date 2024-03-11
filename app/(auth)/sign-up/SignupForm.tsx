"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SignupFormSchema, SignupFormType } from "@/app/validation";

const SignupForm = () => {
  const form = useForm<SignupFormType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignupFormType) => {
    try {
      const response = await axios.post("/api/sign-up", values);

      if (response.status === 200) {
        await signIn("credentials", {
          ...values,
          redirect: true,
          callbackUrl: "/",
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return toast.error(error.response?.data.error);
        }
      }

      return toast.error("Something went wrong");
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={form.formState.isSubmitting}
              variant="primary"
              type="submit"
              className="w-full"
            >
              {form.formState.isSubmitting ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Sign Up
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p className="mr-2">Already have an account?</p>{" "}
        <Link
          href="/sign-in"
          className="text-blue-500 transition-colors hover:text-blue-700"
        >
          Sign in
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
