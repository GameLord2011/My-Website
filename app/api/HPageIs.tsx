"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { isBrowser } from "react-device-detect";
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
      {isBrowser && !bot && (
        <div>
          <Link href="https://github-readme-stats.vercel.app/">
            <div className="fixed bottom-0 right-0 m-0 h-[195px] w-[467px] bg-svgimg p-0" />
          </Link>
        </div>
      )}
    </>
  );
}
