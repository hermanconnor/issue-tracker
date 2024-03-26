import Link from "next/link";
import { getServerSession } from "next-auth";
import { SheetClose } from "../ui/sheet";

import authOptions from "@/app/api/auth/authOptions";

const MobileAuthLinks = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      {!session?.user && (
        <>
          <SheetClose asChild>
            <Link href="/sign-in" className="font-medium text-purple-500">
              Sign In
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href="/sign-up" className="font-medium text-purple-500">
              Sign Up
            </Link>
          </SheetClose>
        </>
      )}
    </>
  );
};

export default MobileAuthLinks;
