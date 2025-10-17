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
    const [particles, setParticles] = useState(false);
    const [uniformPhase, setUniformPhase] = useState(true);

    const canvasRef = useRef<HTMLCanvasElement>(null);
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
        setParticles(Math.random() > 0.5);
    }, []);

    useEffect(() => {
        if (particles === null) return;

        if (!particles && !shown) {
            setInit(true);

            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            let width = window.innerWidth;
            let height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            const fontSize = 21;
            const numDrops = Math.floor(width / fontSize + 1);
            const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ日012345789Z¦|ｸç";
            const trailLength = 7;
            const openingSpeed = 2.5;

            if (!dropsRef.current || dropsRef.current.length !== numDrops) {
                dropsRef.current = Array.from({ length: numDrops }, (_, i) => ({
                    x: i * fontSize,
                    y: -trailLength * fontSize,
                    speed: openingSpeed,
                    trail: Array.from({ length: trailLength }, () => "█"),
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

                ctx.globalCompositeOperation = "source-over"; // or "source-over" for normal draw

                if (!dropsRef.current) return;

                let allReachedBottom = true;

                for (let i = 0; i < dropsRef.current.length; i++) {
                    const drop = dropsRef.current[i];

                    if (uniformPhase) {
                        drop.y += drop.speed;

                        for (let j = 0; j < drop.trail.length; j++) {
                            const trailY = drop.y - fontSize * j;
                            const alpha = 1 - j / drop.trail.length;
                            ctx.fillStyle = `rgba(0, 255, 65, ${alpha.toFixed(2)})`;
                            ctx.shadowBlur = j === 0 ? 8 : 0;
                            ctx.fillText("█", drop.x, trailY);
                        }

                        if (drop.y < height + trailLength * fontSize) {
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

                    if (drop.y > height + Math.random() * 100) {
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
                            () =>
                                chars[Math.floor(Math.random() * chars.length)],
                        );
                    }
                    setUniformPhase(false);
                }

                animationFrameId = requestAnimationFrame(draw);
            };

            draw();

            const handleResize = () => {
                width = window.innerWidth;
                height = window.innerHeight;
                canvas.width = width;
                canvas.height = height;

                const newNumDrops = Math.floor(width / fontSize + 1);

                // Reinitialize drops if count changes
                if (
                    !dropsRef.current ||
                    dropsRef.current.length !== newNumDrops
                ) {
                    dropsRef.current = Array.from(
                        { length: newNumDrops },
                        (_, i) => ({
                            x: i * fontSize,
                            y: Math.random() * height,
                            speed: uniformPhase
                                ? 2.5
                                : Math.random() * 1.5 + 0.5,
                            trail: Array.from({ length: trailLength }, () =>
                                uniformPhase
                                    ? "█"
                                    : chars[
                                          Math.floor(
                                              Math.random() * chars.length,
                                          )
                                      ],
                            ),
                            frameCount: 0,
                            changeRate: Math.floor(Math.random() * 10 + 5),
                        }),
                    );
                } else {
                    // Just reposition existing drops
                    for (let i = 0; i < dropsRef.current.length; i++) {
                        dropsRef.current[i].x = i * fontSize;
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
    }, [init, canvasRef, particles, uniformPhase]);

    if (!init) {
        return null;
    }

    return (
        <>
            {particles ? (
                <Particles id="tsparticles" url="/particles.json" />
            ) : (
                <>
                    <style jsx>{`
                        .canvas {
                            position: fixed;
                            display: inline-flex;
                            inset: 0;
                            z-index: -100000000;
                            width: 100vw;
                            height: 100vh;
                            pointerevents: none;
                        }
                    `}</style>
                    <canvas ref={canvasRef} className="canvas" />
                </>
            )}
        </>
    );
}
