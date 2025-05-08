"use client";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { UAParser } from "ua-parser-js";
import { isbot } from "isbot";

export default function HPageIs() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    setIsMobile(result.device.type === "mobile");
    setIsClient(true);
    setIsLoaded(true);
  }, []);

  if (!isClient || !isLoaded) {
    return null;
  }

  const bot = isbot(navigator.userAgent);
  const message = bot ? "You are a bot" : "You are not a bot";
  console.log(message);

  return (
    <>
      {!isMobile && !bot && (
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
