"use client"

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default function TSParticles(){
    const [init, setInit] = useState(false);
  
    useEffect(() => {
      initParticlesEngine(async (engine) => {
        await loadFull(engine);
      }).then(() => {
        setInit(true);
      });
    }, []);

    const particlesLoaded = async (container?: Container) => {
      console.log(container);
    };
  
    if(init){
        return(
            <>
                <Particles
                    id="tsparticles"
                    url="/particles.json"
                    particlesLoaded={particlesLoaded}
                />
            </>
        )
    }

    return<></>;  
}
