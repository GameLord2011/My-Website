"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { isBrowser, isMobile } from "react-device-detect";
import { isbot } from "isbot";

export default function HPageIs() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const bot = isbot(navigator.userAgent);

  const message = bot ? "You are a bot" : "You are not a bot";

  console.log(message);

  return (
    <>
      {(isBrowser || (!isBrowser && !isMobile)) && !bot && (
        <div>
          <Link href="https://github-readme-stats.vercel.app/">
            <div
              className="bg-svgimg fixed right-0 bottom-0 m-0 block h-[195px] w-[467px] p-0"
              aria-label="github stats image"
            />
          </Link>
        </div>
      )}
      {isMobile && !bot && (
        <div>
          <Link href="https://github-readme-stats.vercel.app/">
            <div
              className="bg-svgimg minsvgw:block fixed right-0 bottom-0 m-0 hidden h-[195px] w-[467px] p-0"
              aria-label="github stats image"
            />
          </Link>
        </div>
      )}
    </>
  );
}
