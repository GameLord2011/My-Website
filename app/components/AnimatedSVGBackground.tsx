"use client";

import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const dynamic = "force-dynamic";

const AnimatedSVGBackground = () => {
  const [isClient, setIsClient] = useState(false);
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);

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

  useGSAP(() => {
    if (!isClient) return;
    circleRefs.current.forEach((circle, i) => {
      if (!circle) return;
      const c = circles[i];
      gsap.to(circle, {
        duration: 10,
        repeat: -1,
        yoyo: true,
        attr: {
          cx: c.cx + c.moveX + "%",
          cy: c.cy + c.moveY + "%",
        },
        ease: "sine.inOut",
      });
      gsap.to(circle, {
        duration: c.dur,
        repeat: -1,
        yoyo: true,
        opacity: 0.5,
        ease: "sine.inOut",
      });
    });
  }, [isClient, circles]);

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
        {/* Draw circles */}
        {circles.map((circle, i) => (
          <circle
            key={i}
            ref={(el) => {
              circleRefs.current[i] = el;
            }}
            cx={`${circle.cx}%`}
            cy={`${circle.cy}%`}
            r={circle.r}
            fill="url(#gradient)"
            opacity="0.7"
          />
        ))}
      </svg>
    </>
  );
};

export default AnimatedSVGBackground;
