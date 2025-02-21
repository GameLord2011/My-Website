"use client";

import { usePathname } from "next/navigation";
import { isBrowser, isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
import Link from "next/link";

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
      {isBrowser && (
        <nav className="relative z-[10000] @container">
          <div className="dropdown inline-block sticky right-full bottom-full group">
            <button
              type="button"
              className="dropbtn bg-[var(--nav-btn-bg)] text-[hsl(0,0%,93%)] p-4 text-lg border-none cursor-pointer top-full left-full z-[1] rounded-r-md hover:animate-btn-hvr"
            >
              Pages
            </button>
            <div className="dropdown-content hidden absolute bg-[var(--nav-bkg)] min-w-[150px] shadow-lg z-[1] rounded-md rounded-tl-none group-hover:block">
              {pathname === "/" ? null : <Link href="/" className="block px-[12px] py-[16px] hover:animate-nvbr-lnk-hvr">Home</Link>}
              {pathname === "/about" ? null : <Link href="/about" className="block px-[12px] py-[16px] hover:animate-nvbr-lnk-hvr">About</Link>}
              {pathname === "/shoutouts" ? null : (
                <Link href="/shoutouts" className="block px-[12px] py-[16px] hover:animate-nvbr-lnk-hvr">Shoutouts</Link>
              )}
              {pathname === "/repos" ? null : <Link href="/repos" className="block px-[12px] py-[16px] hover:animate-nvbr-lnk-hvr">Repos</Link>}
              <Link href="https://linktr.ee/GameLord2011" className="block px-[12px] py-[16px] hover:animate-nvbr-lnk-hvr">Links</Link>
            </div>
          </div>
        </nav>
      )}
      {isMobile && (
        <nav>
          <div className="mobile-navbar-content bg-[var(--nav-bkg)] w-full top-full left-0 z-[1] sticky flex text-center justify-center">
            {pathname === "/" ? null : <Link href="/" className="block px-[5px] py-[12px] hover:animate-nvbr-lnk-hvr @max-[240px]:px-[12px] @max[240px]:py-[16px]">Home</Link>}
            {pathname === "/about" ? null : <Link href="/about" className="block px-[5px] py-[12px] hover:animate-nvbr-lnk-hvr @max-[240px]:px-[12px] @max[240px]:py-[16px]">About</Link>}
            {pathname === "/shoutouts" ? null : (
              <Link href="/shoutouts" className="block px-[5px] py-[12px] hover:animate-nvbr-lnk-hvr @max-[240px]:px-[12px] @max[240px]:py-[16px]">Shoutouts</Link>
            )}
            {pathname === "/repos" ? null : <Link href="/repos" className="block px-[5px] py-[12px] hover:animate-nvbr-lnk-hvr @max-[240px]:px-[12px] @max[240px]:py-[16px]">Repos</Link>}
            <Link href="https://linktr.ee/GameLord2011" className="block px-[5px] py-[12px] @max-[240px]:px-[12px] @max[240px]:py-[16px]">Links</Link>
          </div>
        </nav>
      )}
    </>
  );
}
