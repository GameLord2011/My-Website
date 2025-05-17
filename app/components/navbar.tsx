"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { UAParser } from "ua-parser-js";
import ThemeSwitcher from "./themeswitcher";

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
    name: "Other",
    mobileHref: "/other",
    href: "",
    subLinks: [
      {
        name: "pokésearch",
        href: "/other/pokesearch",
      },
      {
        name: "Links",
        href: "https://linktr.ee/GameLord2011",
      },
    ],
  },
];

export default function Navbar() {
  const pathname: string = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    setIsMobile(
      result.device.type === "mobile" ||
        result.device.type === "xr" ||
        result.device.type === "tablet" ||
        result.device.type === "embedded" ||
        result.device.type === "console" ||
        result.device.type === "smarttv" ||
        result.device.type === "wearable" ||
        result.device.type === "xr",
    );
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <>
      {!isMobile && (
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
                <div key={link.name} className="group/sub relative">
                  <Link
                    href={link.href}
                    className={clsx(
                      "hover:animate-nvbr-lnk-hvr block px-[12px] py-[16px] transition-all duration-500 ease-in-out",
                      {
                        hidden: pathname === link.href,
                      },
                    )}
                  >
                    {link.name}
                    {link.subLinks && <span className="float-right">▶</span>}
                  </Link>
                  {link.subLinks && (
                    <div className="dropdown-subcontent absolute top-0 left-full hidden min-w-[150px] rounded-md bg-[var(--nav-bkg)] shadow-lg transition-all duration-500 ease-in-out group-hover/sub:block">
                      {link.subLinks.map((subLink) => (
                        <Link
                          href={subLink.href}
                          key={subLink.name}
                          className={clsx(
                            "hover:animate-nvbr-lnk-hvr block px-[12px] py-[16px] transition-all duration-500 ease-in-out",
                            {
                              hidden: pathname === subLink.href,
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
            <ThemeSwitcher />
          </div>
        </nav>
      )}
      {isMobile && (
        <nav>
          <div className="mobile-navbar-content sticky top-full left-0 z-[1] flex w-full max-w-full justify-center bg-[var(--nav-bkg)] text-center">
            {links.map((link) => (
              <Link
                href={(link.href || link.mobileHref) as string}
                className={clsx(
                  "hover:animate-nvbr-lnk-hvr block px-[5px] py-[12px] transition-all duration-500 ease-in-out @max-[241px]:px-[1px] @max-[241px]:py-[1px]",
                  {
                    hidden:
                      pathname === link.href ||
                      pathname.includes(link.mobileHref as string),
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
