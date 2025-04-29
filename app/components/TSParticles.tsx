"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { tsParticles } from "@tsparticles/engine";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { usePathname, useSearchParams } from "next/navigation"; // Use these hooks to detect route changes

export const dynamic = "force-dynamic";

export default function TSParticles() {
  const [init, setInit] = useState(false);
  const pathname = usePathname(); // Detects the current path
  const searchParams = useSearchParams(); // Detects query parameters
  const particles = tsParticles.domItem(0);

  useEffect(() => { 
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    if (!particles) return;

    // Pause particles when the route changes
    particles.pause();

    // Play particles after the route change is complete
    particles.play();
  }, [pathname, searchParams, particles]); // Trigger this effect when the path or query parameters change

  const particlesLoaded = async (container?: Container) => {
    console.info(container);
  };

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          url="/particles.json"
          particlesLoaded={particlesLoaded}
        />
      )}
    </>
  );
}
