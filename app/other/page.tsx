"use client";

import Link from "next/link";
import { isMobileCheck } from "components/isMobile";
import { useEffect } from "react";
import { useState } from "react";
import { subLinks } from "components/navbar";

export default function Page() {
    const isMobile: boolean = isMobileCheck();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    /*const links: {
    name: string;
    href: string;
  }[] = [
    {
      name: "pokésearch",
      href: "/other/pokesearch",
    },
    {
      name: "Links",
      href: "https://linktr.ee/GameLord2011",
    },
    {
      name: "README",
      href: "/other/readme"
    },
    {
      name: "Guestbook",
      href: "/other/guestbook",
    },
  ];*/

    if (!isLoaded) return null;

    return (
        <>
            {!isMobile && (
                <main className="flex flex-col items-center justify-center">
                    <p>
                        Wait, what are you doing here? This is a mobile only
                        page.
                    </p>
                </main>
            )}
            {isMobile && (
                <main className="flex flex-col items-center justify-center">
                    {subLinks.map((link) => (
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
