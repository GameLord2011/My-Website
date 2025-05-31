"use client";

import Link from "next/link";
import { isMobileCheck } from "components/isMobile";
import { useEffect } from "react";
import { useState } from "react";

export default function Page() {
  const isMobile = isMobileCheck();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const links = [
    {
      name: "pokésearch",
      href: "/other/pokesearch",
    },
    {
      name: "Links",
      href: "https://linktr.ee/GameLord2011",
    },
  ];

  if (!isLoaded) return null;

  return (
    <>
      {!isMobile && (
        <main className="flex flex-col items-center justify-center">
          <p>Wait, what are you doing here? This is a mobile only page.</p>
        </main>
      )}
      {isMobile && (
        <main className="flex flex-col items-center justify-center">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="m-2 rounded-lg bg-[var(--nav-bkg)] p-4 text-center shadow-lg transition-all duration-500 hover:scale-105"
            >
              {link.name}
            </Link>
          ))}
        </main>
      )}
    </>
  );
}
