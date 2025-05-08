"use client";

import { useEffect } from "react";
import { Fragment } from "react";
import { useState } from "react";

export const dynamic = "force-dynamic";

const AnimatedSVGBackground = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [circles] = useState(() =>
    [...Array(50)].map(() => ({
      cx: Math.random() * 100,
      cy: Math.random() * 100,
      r: Math.random() * 10,
      dur: Math.random() * 3 + 2,
      moveX: Math.random() * 50 - 25,
      moveY: Math.random() * 50 - 25,
    })),
  );

  if (!isClient) {
    return null; // Render nothing until the client is ready
  }

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="fixed top-0 left-0 -z-10 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%">
            <stop offset="0%" stopColor="#03A062" />
            <stop offset="100%" stopColor="#00000000" />
          </linearGradient>
        </defs>
        {circles.map((circle, i) => (
          <Fragment key={i}>
            <style jsx key={i}>{`
              .circle-${i} {
                animation:
                  move-circle-${i} 10s infinite,
                  pulse-circle-${i} ${circle.dur}s infinite;
              }
              @keyframes move-circle-${i} {
                0% {
                  cx: ${circle.cx}%;
                  cy: ${circle.cy}%;
                }
                50% {
                  cx: ${circle.cx + circle.moveX}%;
                  cy: ${circle.cy + circle.moveY}%;
                }
                100% {
                  cx: ${circle.cx}%;
                  cy: ${circle.cy}%;
                }
              }
              @keyframes pulse-circle-${i} {
                0%,
                100% {
                  r: 10;
                  opacity: 0.7;
                }
                50% {
                  r: 20;
                  opacity: 0.5;
                }
              }
            `}</style>
            <circle
              key={i}
              className={`circle-${i}`}
              cx={`${circle.cx}%`}
              cy={`${circle.cy}%`}
              r={circle.r}
              fill="url(#gradient)"
              opacity="0.7"
            />
          </Fragment>
        ))}
      </svg>
    </>
  );
};

export default AnimatedSVGBackground;
