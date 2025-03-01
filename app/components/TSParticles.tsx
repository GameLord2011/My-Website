"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { loadSlim } from "@tsparticles/slim";
import { isMobile, isBrowser } from "react-device-detect";

export default function TSParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      if (isBrowser) {
        await loadFull(engine);
      } else if (isMobile) {
        await loadSlim(engine);
      } else {
        await loadSlim(engine);
      }
    }).then(() => {
      setInit(true);
    });
  }, []);

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
