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
        <nav className="relative z-10000">
          <div className="dropdown sticky right-full bottom-full">
            <button type="button" className="dropbtn">
              Pages
            </button>
            <div className="dropdown-content">
              {pathname === "/" ? null : <Link href="/">Home</Link>}
              {pathname === "/about" ? null : <Link href="/about">About</Link>}
              {pathname === "/shoutouts" ? null : (
                <Link href="/shoutouts">Shoutouts</Link>
              )}
              {pathname === "/repos" ? null : <Link href="/repos">Repos</Link>}
              <Link href="https://linktr.ee/GameLord2011">Links</Link>
            </div>
          </div>
        </nav>
      )}
      {isMobile && (
        <nav>
          <div className="mobile-navbar-content">
            {pathname === "/" ? null : <Link href="/">Home</Link>}
            {pathname === "/about" ? null : <Link href="/about">About</Link>}
            {pathname === "/shoutouts" ? null : (
              <Link href="/shoutouts">Shoutouts</Link>
            )}
            {pathname === "/repos" ? null : <Link href="/repos">Repos</Link>}
            <Link href="https://linktr.ee/GameLord2011">Links</Link>
          </div>
        </nav>
      )}
    </>
  );
}
