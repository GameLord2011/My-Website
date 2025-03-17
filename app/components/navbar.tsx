"use client";

import { usePathname } from "next/navigation";
import { isBrowser, isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeSwitcher from './themeswitcher';

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
        <nav className="z-[10000] flex items-center justify-between">
          <div className="dropdown group inline-block">
            <button
              type="button"
              className="hover:animate-btn-hvr cursor-pointer rounded-r-md border-none bg-[var(--nav-btn-bg)] p-4 text-lg text-[hsl(0,0%,93%)] transition-all duration-500 ease-in-out"
            >
              Pages
            </button>
            <div className="dropdown-content absolute hidden min-w-[150px] rounded-md rounded-tl-none bg-[var(--nav-bkg)] shadow-lg transition-all duration-500 ease-in-out group-hover:block">
              {pathname === "/" ? null : (
                <Link
                  href="/"
                  className="hover:animate-nvbr-lnk-hvr block px-[12px] py-[16px] transition-all duration-500 ease-in-out"
                >
                  Home
                </Link>
              )}
              {pathname === "/about" ? null : (
                <Link
                  href="/about"
                  className="hover:animate-nvbr-lnk-hvr block px-[12px] py-[16px] transition-all duration-500 ease-in-out"
                >
                  About
                </Link>
              )}
              {pathname === "/shoutouts" ? null : (
                <Link
                  href="/shoutouts"
                  className="hover:animate-nvbr-lnk-hvr block px-[12px] py-[16px] transition-all duration-500 ease-in-out"
                >
                  Shoutouts
                </Link>
              )}
              {pathname === "/repos" ? null : (
                <Link
                  href="/repos"
                  className="hover:animate-nvbr-lnk-hvr block px-[12px] py-[16px] transition-all duration-500 ease-in-out"
                >
                  Repos
                </Link>
              )}
              <Link
                href="https://linktr.ee/GameLord2011"
                className="hover:animate-nvbr-lnk-hvr block px-[12px] py-[16px] transition-all duration-500 ease-in-out"
              >
                Links
              </Link>
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
            {pathname === "/" ? null : (
              <Link
                href="/"
                className="hover:animate-nvbr-lnk-hvr @max[240px]:py-[16px] block px-[5px] py-[12px] transition-all duration-500 ease-in-out @max-[240px]:px-[12px]"
              >
                Home
              </Link>
            )}
            {pathname === "/about" ? null : (
              <Link
                href="/about"
                className="hover:animate-nvbr-lnk-hvr @max[240px]:py-[16px] block px-[5px] py-[12px] transition-all duration-500 ease-in-out @max-[240px]:px-[12px]"
              >
                About
              </Link>
            )}
            {pathname === "/shoutouts" ? null : (
              <Link
                href="/shoutouts"
                className="hover:animate-nvbr-lnk-hvr @max[240px]:py-[16px] block px-[5px] py-[12px] transition-all duration-500 ease-in-out @max-[240px]:px-[12px]"
              >
                Shoutouts
              </Link>
            )}
            {pathname === "/repos" ? null : (
              <Link
                href="/repos"
                className="hover:animate-nvbr-lnk-hvr @max[240px]:py-[16px] block px-[5px] py-[12px] transition-all duration-500 ease-in-out @max-[240px]:px-[12px]"
              >
                Repos
              </Link>
            )}
            <Link
              href="https://linktr.ee/GameLord2011"
              className="hover:animate-nvbr-lnk-hvr @max[240px]:py-[16px] block px-[5px] py-[12px] transition-all duration-500 ease-in-out @max-[240px]:px-[12px]"
            >
              Links
            </Link>
            <ThemeSwitcher />
          </div>
        </nav>
      )}
    </>
  );
}
