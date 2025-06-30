"use client";

import dynamic from "next/dynamic";

import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Typed from "typed.js";
import Image from "next/image";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { isMobileCheck } from "components/isMobile";
import Opening from "components/opening";

const Age = dynamic(() => import("age-ts"), {
  loading: () => <span>Loading...</span>,
  ssr: false,
});

const HPageIs = dynamic(() => import("components/HPageIs"), {
  loading: () => <span>Loading...</span>,
  ssr: false,
});

export default function Home() {
  const isMobile: boolean = isMobileCheck();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isTilted, setIsTilted] = useState<boolean>(false);

  useEffect((): void => {
    setIsLoaded(true);
  }, []);

  const el = useRef<HTMLSpanElement>(null);
  const content = useRef<HTMLElement>(null);
  const liContent = useRef<HTMLLIElement[]>([]);
  const flag = useRef<HTMLImageElement>(null);

  useEffect((): void => {
    liContent.current = [];
  }, []);

  const setLiRef = (el: HTMLLIElement | null): void => {
    if (el && !liContent.current.includes(el)) {
      liContent.current.push(el);
    }
  };

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrambleTextPlugin);
  gsap.registerPlugin(SplitText);
  const timeline: gsap.core.Timeline = gsap.timeline();
  const duration: () => number = () => gsap.utils.random(1.5, 4, 0.1);

  const namedur: number = duration();

  useGSAP((): void => {
    if (!content.current) return;

    timeline.to(
      content.current,
      {
        duration: namedur,
        scrambleText: {
          text: content?.current?.innerText as string,
          chars:
            'ʎﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789:・."=*+-</>¦|⁝⁞₩₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾⍉⍊⍋',
          revealDelay: (() => gsap.utils.random(0.1, 0.9))(),
          tweenLength: true,
          speed: (() => gsap.utils.random(0.5, 0.9))(),
        },
      },
      0,
    );

    liContent.current.forEach((el) => {
      gsap.to(el, {
        duration: duration(),
        scrambleText: {
          text: el?.innerText as string,
          chars:
            'ʎﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789:・."=*+-</>¦|⁝⁞₩₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾⍉⍊⍋',
          revealDelay: (() => gsap.utils.random(0.1, 1))(),
          tweenLength: true,
          speed: (() => gsap.utils.random(0.5, 1))(),
        },
      });
    });
  }, [isLoaded]);

  useEffect((): void => {
    if (!isLoaded) return;

    if (!el.current) return;

    const typed: Typed = new Typed(el.current, {
      strings: [
        '<span class="underline decoration-red-700 decoration-wavy decoration-1 underline-offset-1">amateur</span> programmer',
        '<span class="underline decoration-red-700 decoration-wavy decoration-1 underline-offset-1">amateur</span> fullstack web dev',
        '<span class="underline decoration-red-700 decoration-wavy decoration-1 underline-offset-1">amateur</span> gamer',
        '<span class="underline decoration-red-700 decoration-wavy decoration-1 underline-offset-1">amateur</span> C / C++ / C# developer',
        "developer",
      ],
      typeSpeed: 90,
      backDelay: 1000,
      backSpeed: 90,
      showCursor: false,
      smartBackspace: true,
    });

    return typed.destroy();
  }, [isLoaded]);

  console.log(
    "██╗    ███╗   ██╗███████╗███████╗██████╗     ██╗  ██╗███████╗██╗     ██████╗ \n██║    ████╗  ██║██╔════╝██╔════╝██╔══██╗    ██║  ██║██╔════╝██║     ██╔══██╗ \n██║    ██╔██╗ ██║█████╗  █████╗  ██║  ██║    ███████║█████╗  ██║     ██████╔╝ \n██║    ██║╚██╗██║██╔══╝  ██╔══╝  ██║  ██║    ██╔══██║██╔══╝  ██║     ██╔═══╝ \n██║    ██║ ╚████║███████╗███████╗██████╔╝    ██║  ██║███████╗███████╗██║██╗  \n╚═╝    ╚═╝  ╚═══╝╚══════╝╚══════╝╚═════╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝ \nIf you find an error in this site, please report it at https://github.com/gamelord2011/my-website/issues \n\n",
  );

  if (!isLoaded) return null;

  const pick: () => -10 | 10 = () => {
    const rand: number = Math.random();

    if (rand > 0.5) {
      return -10;
    }

    return 10;
  };

  const rotatedCheck: () => 0 | -10 | 10 = () => {
    const number: -10 | 10 = pick();

    if (isTilted) {
      setIsTilted(false);
      return 0;
    }

    setIsTilted(true);
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
        {isMobile && <br />}
        <div className="jio2:w-full jio2:text-xs bz30:w-2/3 bz30:rounded-sm bz30:border-2 bz30:border-dotted bz30:border-Gween-300 bz30:text-xl bz30:dark:border-Gween-600 flex h-1/5 flex-row content-center justify-center self-center p-10 text-center transition-all duration-500 ease-in-out">
          <p>
            I&#39;m {isMobile && <br />}
            <b
              ref={content}
              className="bg-Gween-300/30 dark:bg-Gween-300/50 relative z-0 inline-block rounded-md border-4 border-double border-white font-serif text-nowrap text-black saturate-200 transition-all duration-500 ease-in-out dark:border-black"
              onMouseEnter={() => {
                gsap.to(content.current, {
                  rotation: pick(),
                  duration: 0.5,
                  ease: "elastic.inOut",
                });
              }}
              onMouseLeave={() => {
                gsap.to(content.current, {
                  rotation: 0,
                  duration: 0.5,
                  ease: "elastic.inOut",
                });
              }}
              onClick={() => {
                if (isMobile) {
                  gsap.to(content.current, {
                    rotation: rotatedCheck(),
                    duration: 0.05,
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
            I am a <Age /> year old{" "}
            <span ref={el}>
              <span className="underline decoration-red-700 decoration-wavy decoration-1 underline-offset-1">
                amateur
              </span>
            </span>{" "}
            in the{" "}
            <Image
              ref={flag}
              width={0}
              src={"/american_flag.svg"}
              height={0}
              className="inline-block h-[1rem] w-auto max-w-none border-none bg-transparent align-text-top transition-all duration-500 ease-in-out"
              alt="United States flag"
              aria-label="United States flag"
            />
            .
          </p>
          <p>I program in:</p>
          <ul className="list-inside">
            <li ref={setLiRef}>C</li>
            <li ref={setLiRef}>C++</li>
            <li ref={setLiRef}>C#</li>
            <li ref={setLiRef}>Javascript</li>
            <li ref={setLiRef}>Html</li>
            <li ref={setLiRef}>Css</li>
            <li ref={setLiRef}>Bash</li>
            <li ref={setLiRef}>Batch</li>
            <li ref={setLiRef}>Powershell Script</li>
            <li ref={setLiRef}>Python</li>
            <li ref={setLiRef}>Typescript</li>
            <li ref={setLiRef}>Json</li>
          </ul>
        </div>
      </main>
      <HPageIs />
    </>
  );
}
