import Link from "next/link";
import Logo from "../Logo";
import NavLinks from "./NavLinks";
import AuthButton from "./AuthButton";

const Navbar = () => {
  return (
    <nav className="mb-6 shadow">
      <div className="mx-auto max-w-screen-xl p-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1 font-bold text-inherit"
          >
            <Logo />
            <span className="hidden text-lg md:block">Issue Tracker</span>
          </Link>

          <div className="flex items-center space-x-6">
            <NavLinks />
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
