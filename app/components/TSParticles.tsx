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

    // Debounce the pause/play logic to prevent strobing
    const timeout = setTimeout(() => {
      particles.pause();
      particles.play();
    }, 100); // Adjust the delay as needed

    return () => clearTimeout(timeout); // Cleanup the timeout
  }, [pathname, searchParams, particles]);

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
