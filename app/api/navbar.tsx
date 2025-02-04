"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname: string = usePathname();

  console.info(`Your path is: ${pathname}`);

  return (
    <nav className="z-[10000] relative">
      <div className="dropdown right-full bottom-full sticky">
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
  );
}
