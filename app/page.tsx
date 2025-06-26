"use client";

import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Age from "age-ts";
import HPageIs from "components/HPageIs";
import Typed from "typed.js";
import Image from "next/image";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { isMobileCheck } from "components/isMobile";

export default function Home() {
  const isMobile = isMobileCheck();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTilted, setIsTilted] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const el = useRef<HTMLSpanElement>(null);
  const content = useRef<HTMLElement>(null);
  const liContent = useRef<HTMLLIElement[]>([]);
  const flag = useRef<HTMLImageElement>(null);

  useEffect(() => {
    liContent.current = [];
  }, []);

  const setLiRef = (el: HTMLLIElement | null) => {
    if (el && !liContent.current.includes(el)) {
      liContent.current.push(el);
    }
  };

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrambleTextPlugin);
  gsap.registerPlugin(SplitText);
  const timeline = gsap.timeline();
  const duration = () => gsap.utils.random(1.5, 4, 0.1);

  const namedur = duration();

  useGSAP(() => {
    if (!content.current) return;

    timeline.to(
      content.current,
      {
        duration: namedur,
        scrambleText: {
          text: content?.current?.innerText as string,
          chars:
            'ʎﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789:・."=*+-</>¦|⁝⁞₩₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾⍉⍊⍋',
          revealDelay: (() => gsap.utils.random(0.1, 1))(),
          tweenLength: true,
          speed: (() => gsap.utils.random(0.5, 1))(),
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

    gsap.to(flag.current, {
      duration: 1,
      rotationX: 15,
      rotationY: 15,
      stagger: 0.01,
      ease: "elastic.inOut",
      overwrite: "auto",
    });
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    if (!el.current) return;

    const typed = new Typed(el.current, {
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

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, [isLoaded]);

  console.log(
    "██╗    ███╗   ██╗███████╗███████╗██████╗     ██╗  ██╗███████╗██╗     ██████╗ \n██║    ████╗  ██║██╔════╝██╔════╝██╔══██╗    ██║  ██║██╔════╝██║     ██╔══██╗ \n██║    ██╔██╗ ██║█████╗  █████╗  ██║  ██║    ███████║█████╗  ██║     ██████╔╝ \n██║    ██║╚██╗██║██╔══╝  ██╔══╝  ██║  ██║    ██╔══██║██╔══╝  ██║     ██╔═══╝ \n██║    ██║ ╚████║███████╗███████╗██████╔╝    ██║  ██║███████╗███████╗██║██╗  \n╚═╝    ╚═╝  ╚═══╝╚══════╝╚══════╝╚═════╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝ \nIf you find an error in this site, please report it at https://github.com/gamelord2011/my-website/issues \n\n",
  );

  if (!isLoaded) return null;

  const pick = () => {
    const rand = Math.random();

    if (rand > 0.5) {
      return -10;
    }

    return 10;
  };

  const rotatedCheck = () => {
    const number = pick();

    if (isTilted) {
      setIsTilted(false);
      return 0;
    }

    setIsTilted(true);
    return number;
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center">
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
              alt="United States of America"
              aria-label="United States of America"
            />
            .
          </p>
          <p>I program in:</p>
          <ul className="list-inside">
            <li ref={setLiRef}>C</li>
            <li ref={setLiRef}>C++</li>
            <li ref={setLiRef}>C#</li>
            <li ref={setLiRef}>Java Script</li>
            <li ref={setLiRef}>Html</li>
            <li ref={setLiRef}>Css</li>
            <li ref={setLiRef}>Bash</li>
            <li ref={setLiRef}>Batch</li>
            <li ref={setLiRef}>Powershell Script</li>
            <li ref={setLiRef}>Python</li>
            <li ref={setLiRef}>Type Script</li>
            <li ref={setLiRef}>Json</li>
          </ul>
        </div>
      </main>
      <HPageIs />
    </>
  );
}
