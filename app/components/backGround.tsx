"use client";

import { useEffect } from "react";
import { useState } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { usePathname } from "next/navigation";
import AnimatedSVGBackground from "./AnimatedSVGBackground";

export const dynamic = "force-dynamic";

export default function Background() {
  const [init, setInit] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <>
      {pathname === "/other/pokesearch" ? (
        <AnimatedSVGBackground />
      ) : (
        init && <Particles id="tsparticles" url="/particles.json" />
      )}
    </>
  );
}
