"use client";

import { UAParser } from "ua-parser-js";
import { useEffect, useState } from "react";

export default function Isiecheck() {
  const [isOldBrowser, setIsOldBrowser] = useState(false);

  useEffect(() => {
    const parser = new UAParser();
    const browser = parser.getBrowser();
    setIsOldBrowser(
      browser.name === "IE" ||
        (browser.name === "Edge" && parseInt(browser.version || "0") < 79),
    );
  }, []);

  if (isOldBrowser) {
    return (
      <>
        <style>{`.displaynotonie{display:none;}`}</style>
        <div className="x-0 y-0 relative z-50 m-0 block h-full w-full p-0 text-center">
          <br />
          <h1 className="text-2xl">WARNING</h1>
          <br />
          <p>Your browser is outdated. Please update to a modern browser.</p>
        </div>
      </>
    );
  }

  return null;
}
