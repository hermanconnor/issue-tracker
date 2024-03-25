import Link from "next/link";
import { getServerSession } from "next-auth";
import { Button } from "@/components/ui/button";

import Logo from "../Logo";
import NavLinks from "./NavLinks";
import AuthButton from "./AuthButton";
import MobileNav from "./MobileNav";
import authOptions from "@/app/api/auth/authOptions";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="mb-6 shadow">
      <div className="mx-auto max-w-screen-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 md:space-x-8">
            <Link
              href="/"
              className="flex items-center gap-1 font-bold text-inherit"
            >
              <Logo />
              <span className="text-lg">Issue Tracker</span>
            </Link>

            <NavLinks />
          </div>

          <div className="flex items-center space-x-4">
            {session && session.user ? (
              <AuthButton />
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/sign-in" className="hidden sm:inline-block">
                  Sign In
                </Link>
                <Button
                  asChild
                  variant="ghost"
                  className="hidden sm:inline-block"
                >
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}

            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
