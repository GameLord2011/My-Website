"use client";

import React, { useEffect, useState } from "react";
import { calculateAge } from "components/calculateAge";
import HPageIs from "components/HPageIs";
import Typed from "typed.js";

export default function Home() {
  const el = React.useRef(null);

  React.useEffect(() => {
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

  const [age, setAge] = useState<number | null>(null);
  const birthdate = process.env.NEXT_PUBLIC_BIRTHDATE || "";

  useEffect(() => {
    const fetchAge = async () => {
      const calculatedAge = await calculateAge(birthdate);
      setAge(calculatedAge);
    };

    fetchAge();
  }, [birthdate]);

  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <div className="jio2:w-full jio2:text-xs bz30:w-2/3 bz30:rounded-sm bz30:border-2 bz30:border-dotted bz30:border-Gween-300 bz30:text-xl bz30:dark:border-Gween-600 flex h-1/5 flex-row content-center justify-center self-center p-10 text-center">
          <p>
            I&#39;m{" "}
            <b className="bg-Gween-300/30 dark:bg-Gween-300/50 relative z-0 rounded-md border-4 border-double border-white font-serif text-black saturate-200 dark:border-black">
              &#64;GameLord2011
            </b>
          </p>
        </div>
        <div>
          <p>
            I am a {Number.isNaN(age) ? "Error" : age !== null ? age : "..."}{" "}
            year old <span ref={el}></span>.
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
