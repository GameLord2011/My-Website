"use client";

import { UAParser } from "ua-parser-js";
import { useEffect } from "react";
import { useState } from "react";

export default function NoApple() {
  const [isApple, setIsApple] = useState<boolean>(false);

  useEffect(() => {
    const parser = new UAParser();
    const device = parser.getDevice();
    setIsApple(device.vendor === "Apple");
  }, [setIsApple]);

  if (isApple) {
    return (
      <>
        <style>{`.displaynotonie{display:none;}`}</style>
        <div className="x-0 y-0 relative z-50 m-0 block h-full w-full p-0 text-center">
          <br />
          <h1 className="text-2xl">NO</h1>
          <br />
          <p>
            Apple does not align with my personal beliefs, so I am blocking all
            apple devices from access to my site.
          </p>
        </div>
      </>
    );
  }

  return null;
}
