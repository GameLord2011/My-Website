"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export const dynamic = "force-dynamic";

export default function Background() {
  const [init, setInit] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [particles, setParticles] = useState(false);

  useEffect(() => {
    setParticles(Math.random() < 0.5);
  }, []);

  console.log(particles);

  useEffect(() => {
    if (particles === null) return;

    if(!particles) {
    setInit(true);

    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const fontSize = 18;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    const chars = "アリガトウサンプルデス0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let animationFrameId: number;

    const draw = () => {
      if(ctx) {
      // Get current canvas pixels
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const fade = 0.8; // 0.8 means alpha is multiplied by 0.8 (so 0.2 fade per frame)

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // If NOT pure black or pure white
      if (!((r === 0 && g === 0 && b === 0) || (r === 255 && g === 255 && b === 255))) {
        data[i + 3] = a * fade;
      }
    }
    ctx.putImageData(imageData, 0, 0);

    // Draw new text with full opacity
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = "rgb(0,143,17)";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    ctx.globalAlpha = 1.0;
    animationFrameId = requestAnimationFrame(draw);
      }
    }

    console.log("Initted!")
    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  } else {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }
  }, [init, canvasRef, particles])

  if(!init) {
    return null;
  }

  return (
    <>
      {particles ? <Particles id="tsparticles" url="/particles.json" /> : (
        <>
        <style jsx>
          {`
            .canvas {
              position: fixed;
              display: inline-flex;
              inset: 0;
              z-index: -100000000;
              width: 100vw;
              height: 100vh;
              pointerEvents: none;
            }
          `}
        </style>
        
        <canvas ref={canvasRef} className="canvas"/> </>)}
    </>
  );
}
