import prisma from "./db";
import { User } from "@prisma/client";

export type UserWithoutPassword = Omit<User, "password">;

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
    },
  });

  return users;
};
