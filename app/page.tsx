"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";
import { isMobileCheck } from "components/isMobile";
import Opening from "components/opening";
import { useAnimations } from "components/settingsProvider";
import Age from "age-ts";
import { siC } from "simple-icons";
import { siGsap } from "simple-icons";
import { siTypescript } from "simple-icons";
import { siDotenv } from "simple-icons";
import { siJavascript } from "simple-icons";
import { siDotnet } from "simple-icons";
import { siRust } from "simple-icons";
import { siReact } from "simple-icons";
import { siNextdotjs } from "simple-icons";
import { siPnpm } from "simple-icons";
import { siModrinth } from "simple-icons";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";

import type { SimpleIcon } from "simple-icons";

export default function Home() {
    const { anims, hasLoadedAnims } = useAnimations();
    const isMobile: boolean = isMobileCheck();
    const isTilted = useRef<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chars: string =
        'ʎﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789:・."=*+-</>¦|⁝⁞₩₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾⍉⍊⍋';
    const content = useRef<HTMLElement>(null);
    const timeline: gsap.core.Timeline = gsap.timeline({
        defaults: { duration: 1, ease: "expo.inOut" },
        repeat: -1,
    });
    const pick: () => -20 | 20 = () => {
        const rand: number = Math.random();

        if (rand > 0.5) {
            return -20;
        }

        return 20;
    };

    const icons: SimpleIcon[] = [ // Changing this array requires a full refresh to take effect.
        siC,
        siGsap,
        siTypescript,
        siJavascript,
        siDotenv,
        siDotnet,
        siRust,
        siReact,
        siNextdotjs,
        siPnpm,
        siModrinth,
    ];

    let ctx: CanvasRenderingContext2D | null;

    gsap.registerPlugin(useGSAP);
    gsap.registerPlugin(MorphSVGPlugin);
    gsap.registerPlugin(ScrambleTextPlugin);

    useGSAP((): void => {
        if (hasLoadedAnims && anims) {
            if (!content.current) return;
            const canvas = canvasRef.current;
            if (!canvas) return;
            ctx = canvas.getContext("2d");
            if (!ctx) return;

            // useGSAP runs twice if navigating from another page, so this is a dirty hack to
            // fix the fact that it was scaling to 25x :P
            if (ctx.getTransform().a !== 5) {
                ctx.scale(5 / ctx.getTransform().a, 5 / ctx.getTransform().a);
            }

            function draw(rawPath: number[][], _target: unknown) {
                if (ctx == null) return;
                ctx.fillStyle = document.documentElement.classList.contains("light") ? "#000" : "#fff";
                console.log(ctx.fillStyle);

                let l, segment, j, i;
                ctx.clearRect(0, 0, 130, 130);
                ctx.beginPath();
                for (j = 0; j < rawPath.length; j++) {
                    segment = rawPath[j];
                    l = segment.length;
                    ctx.moveTo(segment[0], segment[1]);
                    for (i = 2; i < l; i += 6) {
                        ctx.bezierCurveTo(
                            segment[i],
                            segment[i + 1],
                            segment[i + 2],
                            segment[i + 3],
                            segment[i + 4],
                            segment[i + 5],
                        );
                    }
                    if (j == rawPath.length - 1) {
                        ctx.closePath();
                    }
                }
                ctx.fill("evenodd");
            }

            draw(MorphSVGPlugin.stringToRawPath(siC.path), null);

            gsap.to(content.current, {
                duration: gsap.utils.random(1.5, 4, 0.1),
                scrambleText: {
                    text: content?.current?.innerText as string,
                    chars: chars,
                    revealDelay: (() => gsap.utils.random(0.1, 0.9))(),
                    tweenLength: true,
                    speed: (() => gsap.utils.random(0.5, 0.9))(),
                },
            });

            for (let i = 0; i < icons.length; i++) {
                let nextshape;

                if (i == icons.length - 1) {
                    nextshape = icons[0].slug;
                } else {
                    nextshape = icons[i + 1].slug;
                }

                timeline.to(
                    `#${icons[i].slug}`,
                    {
                        morphSVG: {
                            shape: `#${nextshape}`,
                            render: draw,
                            updateTarget: false,
                        },
                    },
                    "+=1",
                );

                console.log(icons[i].slug);
            }
        } else {
            return;
        }
    }, [hasLoadedAnims, anims, content]);

    const rotatedCheck: () => 0 | -20 | 20 = () => {
        const number: -20 | 20 = pick();

        if (isTilted.current) {
            isTilted.current = false;
            return 0;
        }

        isTilted.current = true;
        return number;
    };

    return (
        <>
            <Opening />
            <main
                className="flex flex-col items-center justify-center"
                aria-label="Homepage main content"
                id="mainContent"
            >
                <div className="jio2:w-full jio2:text-xs bz30:w-1/2 bz30:rounded-sm bz30:border-2 bz30:border-dotted bz30:border-Gween-300 bz30:text-xl bz30:dark:border-Gween-600 flex h-1/5 flex-row content-center justify-center self-center p-10 text-center transition-all duration-500 ease-in-out">
                    <p>
                        I&#39;m{" "}
                        <b
                            ref={content}
                            className="bg-Gween-300/30 dark:bg-Gween-300/50 relative z-0 inline-block rounded-md border-4 border-double border-white font-serif text-nowrap text-black saturate-200 transition-all duration-500 ease-in-out dark:border-black"
                            onMouseEnter={() => {
                                if (anims) {
                                    gsap.to(content.current, {
                                        rotation: pick(),
                                        duration: 0.5,
                                        ease: "elastic.inOut",
                                    });
                                }
                            }}
                            onMouseLeave={() => {
                                if (anims) {
                                    gsap.to(content.current, {
                                        rotation: 0,
                                        duration: 0.5,
                                        ease: "elastic.inOut",
                                    });
                                }
                            }}
                            onClick={() => {
                                if (isMobile && anims) {
                                    gsap.to(content.current, {
                                        rotation: rotatedCheck(),
                                        duration: 0.5,
                                        ease: "elastic.inOut",
                                    });
                                }
                            }}
                        >
                            &#64;GameLord2011
                        </b>
                    </p>
                </div>
                <div>
                    <p>
                        I am a <Age /> year old developer in the{" "}
                        <Image
                            width={0}
                            src={"/american_flag.svg"}
                            height={0}
                            className="inline-block h-[1rem] w-auto max-w-none border-none bg-transparent align-text-top transition-all duration-500 ease-in-out"
                            alt="United States"
                            aria-label="United States"
                        />
                        .
                    </p>
                    <p>I use:</p>
                    <div className="pt-2">
                        <svg className="h-0 w-0" height={0} width={0}>
                            {icons.map((icn, i) => (
                                <path id={icn.slug} d={icn.path} key={i} />
                                /*
                                    Even when it's not seen in the view, for some
                                    reason gsap uses the dom api to get the thingie.
                                */
                            ))}
                        </svg>
                        <canvas
                            ref={canvasRef}
                            height={120}
                            width={120}
                            className="place-self-center"
                        />
                    </div>
                </div>
            </main>
        </>
    );
}
