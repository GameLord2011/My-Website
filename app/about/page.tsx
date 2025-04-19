"use client";

import { useEffect } from "react";
import Link from "next/link";
import hljs from "highlight.js/lib/core";
import "styles/theme.css";
import bash from "highlight.js/lib/languages/bash";
import Age from "age-ts";

hljs.registerLanguage("bash", bash);

export default function About() {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-2xl">About This Site</h1>
      <br />
      <div className="float-left w-1/2 text-left sm:w-1/3 sm:text-xs md:w-2/3 md:text-sm">
        <h2 title="I Like This" className="text-lg">
          What to do when you like this site, and wish yours was like this.
        </h2>
        <br />
        <p>
          If you wish your site were something like this, then you can use this
          site as a base!
          <br />
          Steps to make this site your own:
        </p>
        <ol className="list-inside list-[lower-greek]">
          <li>
            First make a{" "}
            <Link title="GitHub" href="https://github.com/">
              github
            </Link>{" "}
            account!
          </li>
          <li>
            Install{" "}
            <Link title="Git" href="https://git-scm.com/">
              git
            </Link>
            ,{" "}
            <Link title="Node.js" href="https://nodejs.org/">
              Node.js
            </Link>
            , and{" "}
            <Link title="pnpm" href="https://www.pnpm.io/">
              pnpm
            </Link>{" "}
            on your device.
          </li>
          <li>
            Fork the{" "}
            <Link href="https://www.github.com/gamelord2011/my-website/">
              Repo
            </Link>
            !
          </li>
          <li>Then, open your devices terminal.</li>
          <li>
            Clone this repository to your local machine:
            <pre>
              <code className="bash transition-all duration-500 ease-in-out">
                git clone
                https://github.com/&lt;your-username&gt;/my-website.git
              </code>
            </pre>
          </li>
          <li>
            Navigate to the project directory:
            <pre>
              <code className="bash transition-all duration-500 ease-in-out">
                cd my-website
              </code>
            </pre>
          </li>
          <li>
            Install the dependencies:
            <pre>
              <code className="bash transition-all duration-500 ease-in-out">
                pnpm i
              </code>
            </pre>
          </li>
          <li>
            Start the development server:
            <pre>
              <code className="bash transition-all duration-500 ease-in-out">
                pnpm dev
              </code>
            </pre>
          </li>
        </ol>
        <br />
        <h1 className="text-2xl">About Me</h1>
        <br />
        <p>
          I am a <Age /> year old developer. I program in a lot of languages,
          but I am best at TypeScript and Html. I also program in C# and some
          java and batch. I mainly use windows, but I have ubuntu (WSL2) and a
          raspberry pi 4b with retropie. I listen to music on spotify and I play
          a lot of <Link href="https://www.minecraft.net/">Minecraft</Link> (
          <Link href="https://namemc.com/profile/GameLord2011.1">
            my profile
          </Link>
          ) and <Link href="https://fortnite.com/">Fortnite</Link> (
          <Link href="https://fortnitetracker.com/profile/all/TRGameLord2011">
            my Fortnite profile
          </Link>
          ). I also love the <Link href="https://www.marvel.com/">Marvel</Link>{" "}
          and <Link href="https://starwars.com/">Star Wars</Link> movies. I am a
          big fan of <Link href="https://itsfoss.com/">F.O.S.S.</Link> and{" "}
          <Link href="https://www.github.com/">GitHub</Link>! I use VSCode and
          Visual Studio for programming.
        </p>
      </div>
    </main>
  );
}
