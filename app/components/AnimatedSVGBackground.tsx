"use client";

import { useMemo, useEffect, useState } from "react";

export const dynamic = "force-dynamic";

const AnimatedSVGBackground = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [viewBox, setViewBox] = useState("0 0 100 100");
  useEffect(() => {
    const updateViewBox = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewBox(`0 0 ${width} ${height}`);
    };

    updateViewBox();
    window.addEventListener("resize", updateViewBox);

    return () => window.removeEventListener("resize", updateViewBox);
  }, []);
  const circles = useMemo(() => {
    return [...Array(50)].map(() => ({
      cx: Math.random() * 100, // Use percentage for responsiveness
      cy: Math.random() * 100, // Use percentage for responsiveness
      r: Math.random() * 10,
      dur: Math.random() * 3 + 2,
    }));
  }, []);

  if (!isClient) {
    return null; // Render nothing until the client is ready
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className="absolute top-0 left-0 -z-10 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%">
          <stop offset="0%" stopColor="#03A062" />
          <stop offset="100%" stopColor="#00000000" />
        </linearGradient>
      </defs>
      {circles.map((circle, i) => (
        <circle
          key={i}
          cx={`${circle.cx}%`}
          cy={`${circle.cy}%`}
          r={circle.r}
          fill="url(#gradient)"
          opacity="0.7"
        >
          <animate
            attributeName="r"
            values="10;20;10"
            dur={`${circle.dur}s`}
            repeatCount="indefinite"
            begin="0s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            values="0.7;0.5;0.7"
            dur={`${circle.dur}s`}
            repeatCount="indefinite"
            begin="0s"
            fill="freeze"
          />
        </circle>
      ))}
    </svg>
  );
};

export default AnimatedSVGBackground;
