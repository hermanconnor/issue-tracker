import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Logo from "@/components/Logo";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <HamburgerMenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Navbar</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-6">
          <SheetTitle>
            <SheetClose asChild>
              <Link href="/" className="flex items-center space-x-2">
                <Logo />
                <span className="text-base font-bold">Issue Tracker</span>
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <Separator className="mb-6" />

        <div className="flex h-full flex-col space-y-6">
          <SheetClose asChild>
            <Link
              href="/dashboard"
              className="font-medium text-purple-500 transition-colors"
            >
              Dashboard
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/issues/list"
              className="font-medium text-purple-500 transition-colors"
            >
              Issues
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href="/sign-in">Sign In</Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href="/sign-up">Sign Up</Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
