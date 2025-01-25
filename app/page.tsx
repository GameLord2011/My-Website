"use client";

import React, { useEffect, useState } from "react";
import { calculateAge } from "api/calculateAge";
import styles from "ansi-styles";
import HPageIs from "api/HPageIs";
import Typed from "typed.js";

export default function Home() {
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        '<span class="underline decoration-red-700 decoration-wavy decoration-1 underline-offset-1">amature</span> programmer',
        '<span class="underline decoration-red-700 decoration-wavy decoration-1 underline-offset-1">amature</span> frontend / backend web dev',
        '<span class="underline decoration-red-700 decoration-wavy decoration-1 underline-offset-1">amature</span> C / C++ / C# developer',
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
  const birthdate = "2011-09-23";
  const DYSTW = new Date("2024-10-30"); // DYSTW = Date You Started This Website

  useEffect(() => {
    const fetchAge = async () => {
      const calculatedAge = await calculateAge(birthdate);
      setAge(calculatedAge);
    };

    fetchAge();
  }, [birthdate]);

  let message = "";
  if (age !== null) {
    if (age <= 0) {
      message = "Wait how are you visiting this site, I'm not even born yet!?!";
    } else if (age >= 1 && new Date().getTime() < DYSTW.getTime()) {
      message =
        "Wait how are you visiting this site, I haven't programmed it yet!?!";
    } else {
      message = `Contrary to what (I Think) you (might have) thought, I am in fact ${age} years old.`;
    }
  }

  console.log(`${styles.blue.open}${message}${styles.blue.close}`);

  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <div className="w-2/3 h-1/5 rounded-s border-dotted border-2 border-Gween-300 dark:border-Gween-600 content-center self-center text-center p-10">
          <p>
            I&#39;m{" "}
            <b className="bg-rainbow text-black font-serif border-white dark:border-black border-double border-4">
              &#64;GameLord2011
            </b>
          </p>
        </div>
        <div>
          <p>
            I am a {age !== null ? age : "..."} year old <span ref={el}></span>.
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
