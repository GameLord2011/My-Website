"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { usePathname } from "next/navigation";

export const dynamic = "force-dynamic";

export default function TSParticles() {
  const [init, setInit] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container) => {
    console.info(container);
  };

  return (
    <>
      {init && (pathname === "/other/pokesearch") && (
        <Particles
          id="tsparticles"
          url="/particles.json"
          particlesLoaded={particlesLoaded}
        />
      )}
    </>
  );
}
