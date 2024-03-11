"use client";

import { signOut } from "next-auth/react";
import { ExitIcon } from "@radix-ui/react-icons";

const LogoutButton = () => {
  return (
    <button
      className="flex items-center gap-2"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <ExitIcon className="h-5 w-5" />
      Log out
    </button>
  );
};

export default LogoutButton;
