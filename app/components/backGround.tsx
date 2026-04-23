"use client";

import { useEffect } from "react";
import { useRef } from "react";
import { shown } from "components/opening";
import { useAnimations } from "components/settingsProvider";
import { Cascadia_Mono } from "next/font/google";

const cascadiaMono = Cascadia_Mono({
    subsets: ["latin"],
    weight: "700",
    preload: true,
    fallback: ["monospace"],
    variable: "--font-cascadia-mono",
});

export const dynamic = "force-dynamic";
const fontSize = 20;

function drawChars(
    ctx: CanvasRenderingContext2D,
    drop: {
        x: number;
        y: number;
        speed: number;
        trail: string[];
        frameCount: number;
        scale: number;
    },
) {
    for (let j = 0; j < drop.trail.length; j++) {
        const trailY = drop.y - fontSize * j;
        const char = drop.trail[j];

        const fade = 1 - j / drop.trail.length;

        const gradient = ctx.createLinearGradient(0, 5, -2.07, -21.21);
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(1, `rgba(0,255,65,${fade.toFixed(2)})`);

        ctx.fillStyle =
            j === 0 ? "rgb(204,255,204)" : `rgba(0,255,65,${fade.toFixed(2)})`;

        ctx.shadowBlur = 8 * fade;

        ctx.save();
        ctx.scale(drop.scale, drop.scale);
        ctx.translate(drop.x / drop.scale, trailY);
        if (char === "3") {
            if (j === drop.trail.length - 1) {
                ctx.shadowBlur = 0;

                ctx.fillStyle = gradient;
                ctx.scale(-1, 1);
                ctx.rotate(Math.PI);
                ctx.fillText(char, 0, 10);
            } else {
                ctx.scale(-1, 1);
                ctx.rotate(Math.PI);
                ctx.fillText(char, 0, 10);
            }
        } else if (["Z", "7", "1"].includes(char)) {
            if (j === drop.trail.length - 1) {
                ctx.shadowBlur = 0;
                ctx.fillStyle = gradient;

                ctx.fillText(char, 0, 0);
            } else {
                ctx.fillText(char, 0, 0);
            }
        } else if (["日", "二"].includes(char)) {
            if (j === drop.trail.length - 1) {
                ctx.shadowBlur = 0;
                ctx.fillStyle = gradient;

                ctx.scale(-0.5, 1); // shrink horizontally
                ctx.fillText(char, -20, 0);
            } else {
                ctx.scale(0.5, 1); // shrink horizontally
                ctx.fillText(char, 0, 0);
            }
        } else {
            if (j === drop.trail.length - 1) {
                ctx.shadowBlur = 0;
                ctx.fillStyle = gradient;

                ctx.scale(-1, 1);
                ctx.fillText(char, -10, 0);
            } else {
                ctx.scale(-1, 1);
                ctx.fillText(char, -10, 0);
            }
        }
        ctx.restore();
    }
}

export default function Background({ hide }: { hide: boolean }) {
    const { anims } = useAnimations();
    let width: number, height: number;

    const init = useRef<boolean>(false);
    let uniformPhase = true;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dropsRef = useRef<
        {
            x: number;
            y: number;
            speed: number;
            trail: string[];
            frameCount: number;
            scale: number;
        }[]
    >(null);

    useEffect(() => {
        if (!shown) {
            init.current = true;

            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            const numDrops = Math.floor(width / fontSize + 1);
            const chars =
                '012345789Z:."=*+-¦|_ ╌ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ日二çｸ';
            // const chars = "137Z日二" //specially handled as per observations from https://scifi.stackexchange.com/questions/137575/is-there-a-list-of-the-symbols-shown-in-the-matrixthe-symbols-rain-how-many
            // const chars = "日" // *wide putin theme plays*
            const trailLength = 20;
            const openingSpeed = 4;

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
                    scale: 1,
                }));
            }

            ctx.font = `${fontSize}px 'Cascadia Mono', monospace`;
            ctx.shadowColor = "#00ff41";

            let animationFrameId: number;

            const draw = () => {
                ctx.globalCompositeOperation = "destination-out";
                ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
                ctx.fillRect(0, 0, width, height);

                ctx.globalCompositeOperation = "source-over";

                if (!dropsRef.current) return;

                let allReachedBottom = true;

                for (let i = 0; i < dropsRef.current.length; i++) {
                    const drop = dropsRef.current[i];

                    for (let j = 1; j < drop.trail.length; j++) {
                        if (Math.random() < 0.003) {
                            drop.trail[j] =
                                chars[Math.floor(Math.random() * chars.length)];
                        }
                    }

                    if (uniformPhase) {
                        drop.frameCount++;

                        if (drop.frameCount == drop.speed) {
                            drop.trail.pop();
                            drop.trail.unshift(
                                chars[Math.floor(Math.random() * chars.length)],
                            );
                            drop.frameCount = 0;
                            drop.y += fontSize;
                        }

                        drawChars(ctx, drop);

                        if (
                            drop.y <
                            height + trailLength * fontSize + fontSize * 3
                        ) {
                            allReachedBottom = false;
                        }

                        continue;
                    }

                    drop.frameCount++;
                    if (drop.frameCount > drop.speed) {
                        drop.trail.pop();
                        drop.trail.unshift(
                            chars[Math.floor(Math.random() * chars.length)],
                        );
                        drop.frameCount = 0;
                        drop.y += fontSize;
                    }

                    drawChars(ctx, drop);

                    switch (drop.scale < 1) {
                        case true:
                            if (
                                drop.y * drop.scale >
                                height + fontSize * trailLength
                            ) {
                                drop.y = Math.floor(Math.random() * -100);
                                drop.speed = Math.random() * 4;
                                drop.x = Math.floor(
                                    Math.random() * window.innerWidth,
                                );
                                drop.scale = Math.random() * 1.4 + 0.3;
                            }
                            break;

                        case false:
                            if (drop.y > height + fontSize * trailLength) {
                                drop.y = Math.floor(Math.random() * -100);
                                drop.speed = Math.random() * 4;
                                drop.x = Math.floor(
                                    Math.random() * window.innerWidth,
                                );
                                drop.scale = Math.random() * 1.4 + 0.3;
                            }
                            break;

                        default:
                            break;
                    }
                }

                if (uniformPhase && allReachedBottom) {
                    for (let i = 0; i < dropsRef.current.length; i++) {
                        const drop = dropsRef.current[i];
                        drop.y = Math.random() * -100;
                        drop.speed = Math.random() * 4;
                        drop.trail = Array.from(
                            { length: trailLength },
                            () =>
                                chars[Math.floor(Math.random() * chars.length)],
                        );
                        drop.scale = Math.random() * 1.4 + 0.3;
                    }
                    uniformPhase = false;
                }

                animationFrameId = requestAnimationFrame(draw);
            };

            draw();

            const handleResize = () => {
                const canvas = canvasRef.current;
                if (!canvas) return;

                width = window.innerWidth;
                height = window.innerHeight;
                canvas.width = width;
                canvas.height = height;

                const fontSize = 20; // Fixed font size
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
                            speed: uniformPhase ? 3 : Math.random() * 4,
                            trail: Array.from(
                                { length: trailLength },
                                () =>
                                    chars[
                                        Math.floor(Math.random() * chars.length)
                                    ],
                            ),
                            frameCount: 0,
                            scale: Math.random(),
                        }),
                    );
                } else {
                    // Just reposition existing drops
                    for (let i = 0; i < dropsRef.current.length; i++) {
                        dropsRef.current[i].x = i * fontSize;
                        dropsRef.current[i].y = Math.random() * height;
                    }
                }

                // Reset font size on canvas context
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.font = `${fontSize}px Cascadia Mono, monospace`;
                    ctx.shadowColor = "#00ff41";
                }
            };

            window.addEventListener("resize", handleResize);

            return () => {
                cancelAnimationFrame(animationFrameId);
                window.removeEventListener("resize", handleResize);
            };
        }
    }, [init.current, canvasRef, anims]);

    if (!init.current || !anims || hide) {
        return null;
    }

    return (
        <div>
            <canvas
                ref={canvasRef}
                className={`pointer-events-none fixed inset-[0] z-[-100000000] inline-flex h-screen w-screen ${cascadiaMono.className}`}
            />
        </div>
    );
}
