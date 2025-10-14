"use client";

import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { shown } from "components/opening";

export const dynamic = "force-dynamic";

export default function Background() {
  const [init, setInit] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [particles, setParticles] = useState(false);
  const dropsRef = useRef<{ x: number; y: number }[] | null>(null);

  useEffect(() => {
    setParticles(Math.random() < 0.5);
  }, []);

  // console.log(particles);

  useEffect(() => {
    if (particles === null) return;

    if (!particles && !shown) {
      setInit(true);

      const canvas: HTMLCanvasElement | null = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let width = window.innerWidth;
      let height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const fontSize = 21;
      const numDrops = Math.floor(width / fontSize) * 1.2;
      if (!dropsRef.current || dropsRef.current.length !== numDrops) {
        dropsRef.current = Array.from({ length: numDrops }, (_, i) => ({
          x: (i * width) / numDrops,
          y: 0,
        }));
      }

      const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ日012345789Z¦|ｸç";
      let animationFrameId: number;

      const draw = () => {
        if (ctx && dropsRef.current) {
          const imageData = ctx.getImageData(0, 0, width, height);
          const data = imageData.data;
          const fade = 0.8;
          for (let i = 0; i < data.length; i += 4) {
            const a = data[i + 3];
            data[i + 3] = a * fade;
            if (data[i + 3] < 2) data[i + 3] = 0;
          }
          ctx.putImageData(imageData, 0, 0);
          ctx.save();
          ctx.translate(width, 0);
          ctx.scale(-1, 1);
          ctx.globalAlpha = 0.7;
          ctx.fillStyle = "rgb(0,143,17)";
          ctx.font = fontSize + "px monospace";
          for (let i = 0; i < dropsRef.current.length; i++) {
            const drop = dropsRef.current[i];
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, drop.x, drop.y);
            drop.y += fontSize * 0.7;
            if (drop.y > height) {
              drop.x = Math.random() * width;
              drop.y = Math.random() * -1000;
            }
          }
          ctx.globalAlpha = 1.0;
          ctx.restore();
          animationFrameId = requestAnimationFrame(draw);
        }
      };

      draw();

      const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        if (dropsRef.current) {
          for (let i = 0; i < dropsRef.current.length; i++) {
            dropsRef.current[i].x = (i * width) / numDrops;
            dropsRef.current[i].y = Math.random() * height;
          }
        }
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
  }, [init, canvasRef, particles]);

  if (!init) {
    return null;
  }

  return (
    <>
      {particles ? (
        <Particles id="tsparticles" url="/particles.json" />
      ) : (
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
                pointerevents: none;
              }
            `}
          </style>
          <canvas ref={canvasRef} className="canvas" />{" "}
        </>
      )}
    </>
  );
}
