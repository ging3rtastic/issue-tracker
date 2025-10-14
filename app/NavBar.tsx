"use client";

import Link               from "next/link";
import { usePathname }    from "next/navigation";
import React              from "react";
import { useSession }     from "next-auth/react";

import { GiFire }         from "react-icons/gi";

import classNames         from "classnames";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath               = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <>
      <nav className="flex space-x-6 justify-between items-center bg-gray-800 text-white p-4">
        <Link href="/" className="nav-link">
          <GiFire className="hover:text-purple-700" />
        </Link>

        <ul className="flex space-x-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className={classNames(
                  "nav-link  hover:text-purple-700 transition-colors",
                  { "text-zinc-200": link.href != currentPath },
                  { "text-green-500": link.href === currentPath },
                )}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Box>
          { status === "authenticated" && (<Link href="api/auth/signout">Log Out</Link>)}
          { status === "unauthenticated" && (<Link href="api/auth/signin">Log In</Link>)}
        </Box>
      </nav>
    </>
  );
};

export default NavBar;
