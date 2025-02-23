"use client";

import { isLegacyEdge, isIE } from "react-device-detect";
import { useEffect, useState } from "react";

export default function Isiecheck() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {(isIE || isLegacyEdge) && (
        <>
          <style>{`.displaynotonie{display:none;}`}</style>
          <div className="x-0 y-0 relative z-50 m-0 block h-full w-full p-0 text-center">
            <h1 className="text-2xl">WARNING</h1>
            <br />
            <p>
              You are using{" "}
              {isIE
                ? "Internet Explorer"
                : isLegacyEdge
                  ? "a legacy version of microsoft edge"
                  : null}
              ; if you love God, your family, and/or your computer at all, you
              should upgrade your browser asap.
            </p>
          </div>
        </>
      )}
    </>
  );
}
