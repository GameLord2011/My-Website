"use client";

import { usePathname } from "next/navigation";
import { isBrowser, isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeSwitcher from "./themeswitcher";
import clsx from "clsx";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Shoutouts",
    href: "/shoutouts",
  },
  {
    name: "Repos",
    href: "/repos",
  },
  {
    name: "Links",
    href: "https://linktr.ee/GameLord2011",
  },
];

export default function Navbar() {
  const pathname: string = usePathname();

  console.info(`Your path is: ${pathname}`);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {(isBrowser || (!isBrowser && !isMobile)) && (
        <nav className="relative z-[10000] flex items-center justify-between">
          <div className="dropdown group inline-block">
            <button
              type="button"
              className="hover:animate-btn-hvr cursor-pointer rounded-r-md border-none bg-[var(--nav-btn-bg)] p-4 text-lg text-[hsl(0,0%,93%)] transition-all duration-500 ease-in-out"
            >
              Pages
            </button>
            <div className="dropdown-content absolute hidden min-w-[150px] rounded-md rounded-tl-none bg-[var(--nav-bkg)] shadow-lg transition-all duration-500 ease-in-out group-hover:block">
              {links.map((link) => (
                <Link
                  href={link.href}
                  className={clsx(
                    'hover:animate-nvbr-lnk-hvr block px-[12px] py-[16px] transition-all duration-500 ease-in-out',
                    {
                      'hidden': pathname === link.href,
                    },
                  )}
                  key={link.name}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <ThemeSwitcher />
          </div>
        </nav>
      )}
      {isMobile && (
        <nav>
          <div className="mobile-navbar-content sticky top-full left-0 z-[1] flex w-full justify-center bg-[var(--nav-bkg)] text-center">
            {links.map((link) => (
              <Link
                href={link.href}
                className={clsx(
                  'hover:animate-nvbr-lnk-hvr @max[240px]:py-[16px] block px-[5px] py-[12px] transition-all duration-500 ease-in-out @max-[240px]:px-[12px]',
                  {
                    'hidden': pathname === link.href,
                  },
                )}
                key={link.name}
              >
                {link.name}
              </Link>
            ))}
            <ThemeSwitcher />
          </div>
        </nav>
      )}
    </>
  );
}
