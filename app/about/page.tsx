"use client";

import { useEffect } from "react";
import Link from "next/link";
import hljs from "highlight.js/lib/core";
import "./theme.scss";
import bash from "highlight.js/lib/languages/bash";

hljs.registerLanguage("bash", bash);

export default function About() {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-2xl">About This Site</h1>
      <br />
      <h1 className="float-left text-left text-xl">What To Do When:</h1>
      <br />
      <div className="float-left w-1/2 text-left sm:w-1/3 sm:text-xs md:w-2/3 md:text-sm">
        <h2 title="I Like This" className="text-lg">
          You like this site, and wish your&#39;s was like this.
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
          <li>Then, open your devices terminal.</li>
          <li>
            Clone this repository to your local machine:
            <pre>
              <code className="bash">
                git clone https://github.com/&lt;your-username&gt;/your-repo.git
              </code>
            </pre>
          </li>
          <li>
            Navigate to the project directory:
            <pre>
              <code className="bash">cd your-repo</code>
            </pre>
          </li>
          <li>
            Install the dependencies:
            <pre>
              <code className="bash">pnpm i</code>
            </pre>
          </li>
          <li>
            Start the development server:
            <pre>
              <code className="bash">pnpm dev</code>
            </pre>
          </li>
        </ol>
      </div>
    </main>
  );
}
