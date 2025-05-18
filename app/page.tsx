"use client";

import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { UAParser } from "ua-parser-js";
import Age from "age-ts";
import HPageIs from "components/HPageIs";
import Typed from "typed.js";
import Image from "next/image";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const el = useRef<HTMLSpanElement>(null);
  const content = useRef<HTMLElement>(null);
  const liContent = useRef<HTMLLIElement[]>([]);

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

  useGSAP(() => {
    if (!isLoaded) if (!content.current) return;

    gsap.to(content.current, {
      duration: (() => gsap.utils.random(1.5, 4, 0.1))(),
      scrambleText: {
        text: content?.current?.innerText as string,
        chars:
          'ʎﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789:・."=*+-<></>¦|⁝⁞₩₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾⍉⍊⍋',
        revealDelay: (() => gsap.utils.random(0.1, 1))(),
        tweenLength: true,
        speed: (() => gsap.utils.random(0.5, 1))(),
      },
    });

    liContent.current.forEach((el) => {
      gsap.to(el, {
        duration: (() => gsap.utils.random(1.5, 4, 0.1))(),
        scrambleText: {
          text: el?.innerText as string,
          chars:
            'ʎﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789:・."=*+-<></>¦|⁝⁞₩₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾⍉⍊⍋',
          revealDelay: (() => gsap.utils.random(0.1, 1))(),
          tweenLength: true,
          speed: (() => gsap.utils.random(0.5, 1))(),
        },
      });
    });
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    if (!el.current) return;

    const typed = new Typed(el.current, {
      strings: [
        '<span class="underline decoration-red-700 decoration-wavy decoration-1 underline-offset-1">amateur</span> programmer',
        '<span class="underline decoration-red-700 decoration-wavy decoration-1 underline-offset-1">amateur</span> fullstack web dev',
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

  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    setIsMobile(result.device.type === "mobile");
    console.log(isMobile);
    setIsLoaded(true);
  }, [isMobile]);

  if (!isLoaded) return null;

  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <div className="jio2:w-full jio2:text-xs bz30:w-2/3 bz30:rounded-sm bz30:border-2 bz30:border-dotted bz30:border-Gween-300 bz30:text-xl bz30:dark:border-Gween-600 flex h-1/5 flex-row content-center justify-center self-center p-10 text-center transition-all duration-500 ease-in-out">
          <p>
            I&#39;m {isMobile && <br />}
            <b
              ref={content}
              className="bg-Gween-300/30 dark:bg-Gween-300/50 relative z-0 rounded-md border-4 border-double border-white font-serif text-black saturate-200 transition-all duration-500 ease-in-out dark:border-black"
            >
              &#64;GameLord2011
            </b>
          </p>
        </div>
        <div>
          <p>
            I am a <Age /> year old <span ref={el}></span> in the{" "}
            <Image
              width={0}
              src={"/american_flag.svg"}
              height={0}
              className="inline-flex h-[1rem] w-auto max-w-none border-none bg-transparent align-text-top"
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
