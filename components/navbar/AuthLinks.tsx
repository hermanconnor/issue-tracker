import Link from "next/link";
import { getServerSession } from "next-auth";
import { Button } from "@/components/ui/button";

import AuthButton from "./AuthButton";
import authOptions from "@/app/api/auth/authOptions";

const AuthLinks = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session && session.user ? (
        <AuthButton />
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/sign-in" className="hidden sm:inline-block">
            Sign In
          </Link>
          <Button asChild variant="ghost" className="hidden sm:inline-block">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default AuthLinks;
