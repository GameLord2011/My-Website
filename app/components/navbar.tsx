"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { isMobileCheck } from "components/isMobile";
import ThemeSwitcher from "./themeswitcher";

export const subLinks = [
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
        href: "/other/readme",
    },
    {
        name: "Guestbook",
        href: "/other/guestbook",
    },
];

const links = [
    {
        name: "Home",
        href: "/",
        subLinks: false,
    },
    {
        name: "About",
        href: "/about",
        subLinks: false,
    },
    {
        name: "Shoutouts",
        href: "/shoutouts",
        subLinks: false,
    },
    {
        name: "Repos",
        href: "/repos",
        subLinks: false,
    },
    {
        name: "Other",
        mobileHref: "/other",
        href: "",
        subLinks: true,
    },
];

export default function Navbar() {
    const pathname: string = usePathname();
    const isMobile = isMobileCheck();
    const [isLoaded, setIsLoaded] = useState(false);
    const [linksOpen, setLinksOpen] = useState(false);
    const [subLinksOpen, setSubLinksOpen] = useState(false);

    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!(linksOpen || subLinksOpen)) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setLinksOpen(false);
                setSubLinksOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [linksOpen, subLinksOpen]);

    if (!isLoaded) return null;

    return (
        <>
            {!isMobile && (
                <nav
                    className="relative z-[10000] flex items-center justify-between"
                    ref={navRef}
                >
                    <div className="dropdown group inline-block">
                        <button
                            type="button"
                            className="hover:animate-btn-hvr cursor-pointer rounded-br-md border-none bg-[var(--nav-btn-bg)] p-4 text-lg text-[hsl(0,0%,93%)] transition-all duration-500 ease-in-out"
                            onClick={() => {
                                setLinksOpen(!linksOpen);
                            }}
                        >
                            Pages
                        </button>
                        <div
                            className={clsx(
                                "absolute min-w-[150px] rounded-md rounded-tl-none bg-[var(--nav-bkg)] shadow-lg transition-all duration-500 ease-in-out group-hover:block",
                                {
                                    block: linksOpen,
                                    hidden: !linksOpen,
                                },
                            )}
                        >
                            {links.map((link) => (
                                <div
                                    key={link.name}
                                    className="sub-group hover:animate-nvbr-lnk-hvr relative first:rounded-tr-md last:rounded-br-md"
                                >
                                    {!link.subLinks && (
                                        <Link
                                            href={link.href}
                                            className={clsx(
                                                "block px-[12px] py-[16px] transition-all duration-500 ease-in-out",
                                                {
                                                    hidden:
                                                        pathname === link.href,
                                                },
                                            )}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                    {link.subLinks && (
                                        <span
                                            className={clsx(
                                                "link block rounded-b-md px-[12px] py-[16px] transition-all duration-500 ease-in-out",
                                                {
                                                    hidden:
                                                        pathname === link.href,
                                                },
                                            )}
                                            onClick={() => {
                                                setSubLinksOpen(!subLinksOpen);
                                            }}
                                        >
                                            {link.name}
                                            <span className="float-right">
                                                ▶
                                            </span>
                                        </span>
                                    )}
                                    {link.subLinks && (
                                        <div
                                            className={clsx(
                                                "dropdown-subcontent sub-hover:block absolute top-0 left-full min-w-[150px] rounded-md rounded-tl-none bg-[var(--nav-bkg)] shadow-lg transition-all duration-500 ease-in-out",
                                                {
                                                    block: subLinksOpen,
                                                    hidden: !subLinksOpen,
                                                },
                                            )}
                                        >
                                            {subLinks.map((subLink) => (
                                                <Link
                                                    href={subLink.href}
                                                    key={subLink.name}
                                                    className={clsx(
                                                        "hover:animate-nvbr-lnk-hvr block px-[12px] py-[16px] transition-all duration-500 ease-in-out first:rounded-tr-md last:rounded-b-md",
                                                        {
                                                            hidden:
                                                                pathname ===
                                                                subLink.href,
                                                        },
                                                    )}
                                                >
                                                    {subLink.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <ThemeSwitcher pad={true} />
                    </div>
                </nav>
            )}
            {isMobile && (
                <nav>
                    <div className="sticky top-full left-0 z-[1] flex w-full max-w-full justify-center bg-[var(--nav-bkg)] text-center text-xs">
                        {links.map((link) => (
                            <Link
                                href={(link.href || link.mobileHref) as string}
                                className={clsx(
                                    "hover:animate-nvbr-lnk-hvr block px-[5px] py-[12px] transition-all duration-500 ease-in-out @max-[241px]:px-[1px] @max-[241px]:py-[1px]",
                                    {
                                        hidden:
                                            pathname === link.href ||
                                            pathname.includes(
                                                link.mobileHref as string,
                                            ),
                                    },
                                )}
                                key={link.name}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <ThemeSwitcher pad={true} />
                    </div>
                </nav>
            )}
        </>
    );
}
