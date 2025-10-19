"use client";

import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAnimations } from "components/animationContext";

const shown = Math.floor(Math.random() * 10000) === 0;
// const shown = true;

export default function Opening() {
    const { anims } = useAnimations();

    const [show, setShow] = useState(false);
    const [uniformPhase, setUniformPhase] = useState(true);
    const [rainStarted, setRainStarted] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const typedRef1 = useRef<HTMLSpanElement>(null);
    const typedRef2 = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const typedInitialized = useRef(false);

    const dropsRef = useRef<
        {
            x: number;
            y: number;
            speed: number;
            trail: string[];
            frameCount: number;
            changeRate: number;
        }[]
    >(null);

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

        const fontSize = 20;
        const trailLength = 10;
        const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ日012345789Z¦|ｸç";
        const openingSpeed = 3;

        let numDrops = Math.floor(width / fontSize) + 1;

        if (!dropsRef.current || dropsRef.current.length !== numDrops) {
            dropsRef.current = Array.from({ length: numDrops }, (_, i) => ({
                x: i * fontSize,
                y: -trailLength * fontSize,
                speed: openingSpeed,
                trail: Array.from(
                    { length: trailLength },
                    () => chars[Math.floor(Math.random() * chars.length)],
                ),
                frameCount: 0,
                changeRate: Math.floor(Math.random() * 10 + 5),
            }));
        }

        ctx.font = `${fontSize}px 'Courier New', monospace`;
        ctx.shadowColor = "#00ff41";

        let animationFrameId: number;

        const draw = () => {
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = "source-over";

            if (!dropsRef.current) return;

            let allReachedBottom = true;

            for (let i = 0; i < dropsRef.current.length; i++) {
                const drop = dropsRef.current[i];

                if (uniformPhase) {
                    drop.frameCount++;
                    if (drop.frameCount > drop.changeRate) {
                        drop.trail.pop();
                        drop.trail.unshift(
                            chars[Math.floor(Math.random() * chars.length)],
                        );
                        drop.frameCount = 0;
                    }

                    for (let j = 0; j < drop.trail.length; j++) {
                        const trailY = drop.y - fontSize * j;
                        const alpha = 1 - j / drop.trail.length;
                        ctx.fillStyle =
                            j === 0
                                ? "#ccffcc"
                                : `rgba(0, 255, 65, ${alpha.toFixed(2)})`;
                        ctx.shadowBlur = j === 0 ? 8 : 0;
                        ctx.fillText(drop.trail[j], drop.x, trailY);
                    }

                    drop.y += drop.speed;

                    if (
                        drop.y <
                        height + trailLength * fontSize + fontSize * 3
                    ) {
                        allReachedBottom = false;
                    }

                    continue;
                }

                // Randomized phase
                drop.frameCount++;
                if (drop.frameCount > drop.changeRate) {
                    drop.trail.pop();
                    drop.trail.unshift(
                        chars[Math.floor(Math.random() * chars.length)],
                    );
                    drop.frameCount = 0;
                }

                for (let j = 1; j < drop.trail.length; j++) {
                    if (Math.random() < 0.05) {
                        drop.trail[j] =
                            chars[Math.floor(Math.random() * chars.length)];
                    }
                }

                for (let j = 0; j < drop.trail.length; j++) {
                    const trailY = drop.y - fontSize * j;
                    const alpha = 1 - j / drop.trail.length;
                    ctx.fillStyle =
                        j === 0
                            ? "#ccffcc"
                            : `rgba(0, 255, 65, ${alpha.toFixed(2)})`;
                    ctx.shadowBlur = j === 0 ? 8 : 0;
                    ctx.fillText(drop.trail[j], drop.x, trailY);
                }

                drop.y += drop.speed;

                if (drop.y > height + fontSize * trailLength) {
                    drop.y = Math.random() * -100;
                    drop.speed = Math.random() * 1.5 + 0.5;
                }
            }

            if (uniformPhase && allReachedBottom) {
                for (let i = 0; i < dropsRef.current.length; i++) {
                    const drop = dropsRef.current[i];
                    drop.y = Math.random() * -100;
                    drop.speed = Math.random() * 1.5 + 0.5;
                    drop.trail = Array.from(
                        { length: trailLength },
                        () => chars[Math.floor(Math.random() * chars.length)],
                    );
                }
                setUniformPhase(false);
                setRainStarted(true);
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            numDrops = Math.floor(width / fontSize) + 1;

            if (!dropsRef.current || dropsRef.current.length !== numDrops) {
                dropsRef.current = Array.from({ length: numDrops }, (_, i) => ({
                    x: i * fontSize,
                    y: Math.random() * height,
                    speed: uniformPhase
                        ? openingSpeed
                        : Math.random() * 1.5 + 0.5,
                    trail: Array.from({ length: trailLength }, () =>
                        uniformPhase
                            ? "█"
                            : chars[Math.floor(Math.random() * chars.length)],
                    ),
                    frameCount: 0,
                    changeRate: Math.floor(Math.random() * 10 + 5),
                }));
            } else {
                for (let i = 0; i < dropsRef.current.length; i++) {
                    dropsRef.current[i].x = i * fontSize;
                    dropsRef.current[i].y = Math.random() * height;
                }
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [show, uniformPhase, anims]);

    useGSAP(() => {
        if (show && containerRef.current) {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, ease: "power2.out" },
            );
        }
    }, [show]);

    useEffect(() => {
        if (!rainStarted || typedInitialized.current || !typedRef1.current)
            return;

        typedInitialized.current = true;

        const typed1 = new Typed(typedRef1.current, {
            strings: ["Wake up, Neo...", "The Matrix has you."],
            typeSpeed: 100,
            showCursor: false,
            backSpeed: 100,
            startDelay: 700,
            smartBackspace: false,
            onComplete: () => {
                if (typedRef2.current) {
                    new Typed(typedRef2.current, {
                        strings: ["Follow the white rabbit."],
                        typeSpeed: 100,
                        showCursor: false,
                        startDelay: 500,
                    });
                }
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
                <div
                    ref={containerRef}
                    className="fixed inset-0 z-[99999999999] flex flex-col items-center justify-center bg-black"
                >
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
                    <div className="relative top-0 z-10 text-center font-mono text-4xl text-[#00ff41] drop-shadow-[0_0_8px_#00ff41]">
                        <span ref={typedRef1}></span>
                        <br />
                        <span
                            ref={typedRef2}
                            className="text-2xl opacity-80"
                        ></span>
                        <br />
                    </div>
                </div>
            )}
        </>
    );
}

export { shown };
