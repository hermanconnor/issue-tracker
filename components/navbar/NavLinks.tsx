"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex items-center space-x-4">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className={cn(
              "hidden font-medium text-purple-500 transition-colors hover:text-purple-600 sm:inline-block",
              link.href === pathname && "text-purple-800",
            )}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
