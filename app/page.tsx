"use client";

import { useEffect } from "react";
import { useRef } from "react";
import Age from "age-ts";
import HPageIs from "components/HPageIs";
import Typed from "typed.js";
import Image from "next/image";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

export default function Home() {

  const el = useRef<HTMLSpanElement>(null);
  const content = useRef<HTMLElement>(null);

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrambleTextPlugin);

  useGSAP(() => {
        gsap.to(content.current, {
            duration: 3,
            scrambleText: {
                text: content?.current?.innerText as string,
                chars: "ʎﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789:・.\"=*+-<></>¦|⁝⁞₩₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾⍉⍊⍋",
                revealDelay: 0.5,
                tweenLength: true,
                speed: 0.9,
        },
      });
  }, []);

  useEffect(() => {
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
  }, []);

  console.log(
    "██╗    ███╗   ██╗███████╗███████╗██████╗     ██╗  ██╗███████╗██╗     ██████╗ \n██║    ████╗  ██║██╔════╝██╔════╝██╔══██╗    ██║  ██║██╔════╝██║     ██╔══██╗ \n██║    ██╔██╗ ██║█████╗  █████╗  ██║  ██║    ███████║█████╗  ██║     ██████╔╝ \n██║    ██║╚██╗██║██╔══╝  ██╔══╝  ██║  ██║    ██╔══██║██╔══╝  ██║     ██╔═══╝ \n██║    ██║ ╚████║███████╗███████╗██████╔╝    ██║  ██║███████╗███████╗██║██╗  \n╚═╝    ╚═╝  ╚═══╝╚══════╝╚══════╝╚═════╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝ \nIf you find an error in this site, please report it at https://github.com/gamelord2011/my-website/issues \n\n",
  );

  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <div className="jio2:w-full jio2:text-xs bz30:w-2/3 bz30:rounded-sm bz30:border-2 bz30:border-dotted bz30:border-Gween-300 bz30:text-xl bz30:dark:border-Gween-600 flex h-1/5 flex-row content-center justify-center self-center p-10 text-center transition-all duration-500 ease-in-out">
          <p>
            <span>
              I&#39;m{" "}
            </span>
            <b ref={content} className="bg-Gween-300/30 dark:bg-Gween-300/50 relative z-0 rounded-md border-4 border-double border-white font-serif text-black saturate-200 transition-all duration-500 ease-in-out dark:border-black">
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
            <li> C</li>
            <li> C++</li>
            <li> C#</li>
            <li> Java Script</li>
            <li> Html</li>
            <li> Css</li>
            <li> Bash</li>
            <li> Batch</li>
            <li> Powershell Script</li>
            <li> Python</li>
            <li> Type Script</li>
            <li> Json</li>
          </ul>
        </div>
      </main>
      <HPageIs />
    </>
  );
}
