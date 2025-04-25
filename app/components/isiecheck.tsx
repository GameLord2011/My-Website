"use client";

import { UAParser } from "ua-parser-js";
import { useEffect, useState } from "react";

export default function Isiecheck() {
  const [isClient, setIsClient] = useState(false);
  const [isOldBrowser, setIsOldBrowser] = useState(false);
  const [browserName, setBrowserName] = useState("");

  useEffect(() => {
    setIsClient(true);
    const parser = new UAParser();
    const browser = parser.getBrowser();
    setBrowserName(browser.name || "");
    setIsOldBrowser(
      browser.name === "IE" ||
        (browser.name === "Edge" && parseInt(browser.version || "0") < 79),
    );
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {isOldBrowser && (
        <>
          <style>{`.displaynotonie{display:none;}`}</style>
          <div className="x-0 y-0 relative z-50 m-0 block h-full w-full p-0 text-center">
            <br />
            <h1 className="text-2xl">WARNING</h1>
            <br />
            <p>
              You are using {browserName}; if you love God, your family, and/or
              your computer at all, you should upgrade your browser asap. <br />{" "}
              I will not let you use this site until you upgrade your browser.
            </p>
          </div>
        </>
      )}
    </>
  );
}
