"use client";

import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Typed from "typed.js";
import { useAnimations } from "components/animationContext";

const shown = Math.floor(Math.random() * 10000) === 0;
// const shown = true;

export default function Opening() {
    const { anims } = useAnimations();

    const [show, setShow] = useState(false);
    const [rainStarted, setRainStarted] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const typedRef1 = useRef<HTMLSpanElement>(null);
    const typedInitialized = useRef(false);

    useEffect(() => {
        if (shown) {
            setShow(true);
        }
    }, []);

    useEffect(() => {
        if (!show || !anims) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        let fadeFrame = 0;
        let animationFrameId: number;

        const drawGlitch = () => {
            ctx.clearRect(0, 0, width, height);

            // B) Fade-in black overlay using globalAlpha
            const fadeOpacity = fadeFrame / 100; // fade over 100 frames
            ctx.save();
            ctx.globalAlpha = fadeOpacity;
            ctx.fillStyle = `rgba(0, 0, 0, ${fadeOpacity})`;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();

            // A) Glitch visuals
            for (let i = 0; i < 25; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const w = Math.random() * 100;
                const h = Math.random() * 20;
                ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
                ctx.fillRect(x, y, w, h);
            }

            fadeFrame++;

            // C) Stop glitching and trigger Typed.js
            if (fadeFrame < 125) {
                animationFrameId = requestAnimationFrame(drawGlitch);
            } else {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, width, height);
                setRainStarted(true);
            }
        };

        setTimeout(() => {
            drawGlitch();
        }, 500);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [show, anims]);

    useEffect(() => {
        if (!rainStarted || typedInitialized.current || !typedRef1.current)
            return;

        typedInitialized.current = true;

        const typed1 = new Typed(typedRef1.current, {
            strings: [
                "Wake up, Neo...",
                "Wake up, Neo... The Matrix has you...",
                "Wake up, Neo... The Matrix has you... Follow the White Rabbit.",
                "Wake up, Neo... The Matrix has you... Follow the White Rabbit. Knock, Knock, Neo.",
            ],
            typeSpeed: 100,
            showCursor: false,
            //backSpeed: 100,
            startDelay: 700,
            //smartBackspace: true,
            onComplete: () => {
                setTimeout(() => {
                    location.reload();
                }, 2000);
            },
        });

        return () => {
            typed1.destroy();
        };
    }, [rainStarted]);

    if (!show) return null;

    return (
        <>
            {show && (
                <div className="pointer-none fixed inset-0 z-[99999999999] flex flex-col items-center justify-center bg-transparent">
                    <canvas
                        ref={canvasRef}
                        width={
                            typeof window !== "undefined"
                                ? window.innerWidth
                                : 1920
                        }
                        height={
                            typeof window !== "undefined"
                                ? window.innerHeight
                                : 1080
                        }
                        className="pointer-events-none absolute inset-0 h-screen w-screen"
                    />
                    <div className="absolute top-0 left-0 z-10 p-2 text-center font-mono text-sm text-[#00ff41] drop-shadow-[0_0_8px_#00ff41]">
                        <span ref={typedRef1}></span>
                    </div>
                </div>
            )}
        </>
    );
}

export { shown };
