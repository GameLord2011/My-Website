"use client";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const shown = Math.floor(Math.random() * 10000) === 0;

export default function Opening() {
  const [show, setShow] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typedRef1 = useRef<HTMLSpanElement>(null);
  const typedRef2 = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropsRef = useRef<{ x: number; y: number }[] | null>(null);

  useEffect(() => {
    if (shown) {
      setTimeout(() => {
        setShow(true);
      }, 4000);
    }
  }, []);

  useEffect(() => {
    if (!show) return;
    // Matrix code rain logic
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const fontSize = 21;
    const numDrops = Math.floor(width / fontSize) * 1.2;
    // Uniform columns for initial wave
    if (!dropsRef.current || dropsRef.current.length !== numDrops) {
      dropsRef.current = Array.from({ length: numDrops }, (_, i) => ({
        x: (i * width) / numDrops,
        y: 0,
      }));
    }
    //const drops = dropsRef.current;

    const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ日012345789Z¦|ｸç";
    let animationFrameId: number;

    // Draw function defined as an expression so it always reads latest randomModeRef.current
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
      // Update drops in place on resize
      if (dropsRef.current) {
        for (let i = 0; i < dropsRef.current.length; i++) {
          dropsRef.current[i].x = (i * width) / numDrops;
          dropsRef.current[i].y = Math.random() * height;
        }
      }
    };
    window.addEventListener("resize", handleResize);

    // Typed.js effect
    let typed1: Typed | undefined;
    let typed2: Typed | undefined;
    if (typedRef1.current) {
      typed1 = new Typed(typedRef1.current, {
        strings: ["Wake up, Neo...", "The Matrix has you."],
        typeSpeed: 100,
        showCursor: false,
        backSpeed: 100,
        startDelay: 700,
        smartBackspace: false,
        onComplete: () => {
          if (typedRef2.current) {
            typed2 = new Typed(typedRef2.current, {
              strings: ["Follow the white rabbit."],
              typeSpeed: 100,
              showCursor: false,
              startDelay: 500,
            });
          }
        },
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(animationFrameId); // Clear the timeout on cleanup
      typed1?.destroy();
      typed2?.destroy();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [show]);

  useGSAP(() => {
    if (show && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
      );
    }
  }, [show]);

  if (!show) return null;

  return (
    <>
      {show && (
        <div
          ref={containerRef}
          className="fixed inset-0 z-[99999999999] flex flex-col items-center justify-center bg-black"
        >
          <canvas
            ref={canvasRef}
            width={typeof window !== "undefined" ? window.innerWidth : 1920}
            height={typeof window !== "undefined" ? window.innerHeight : 1080}
            className="pointer-events-none absolute inset-0 h-screen w-screen"
          />
          <div className="relative top-0 z-10 text-center font-mono text-4xl text-[#00ff41] drop-shadow-[0_0_8px_#00ff41]">
            <span ref={typedRef1}></span>
            <br />
            <span ref={typedRef2} className="text-2xl opacity-80"></span>
            <br />
          </div>
        </div>
      )}
    </>
  );
}

export { shown };
