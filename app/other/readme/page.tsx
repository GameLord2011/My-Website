"use client";

import { useEffect } from "react";
import { useState } from "react";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import "highlight.js/styles/github-dark.css"; // Or another highlight.js theme

export default function Page() {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/gamelord2011/gamelord2011/main/README.md",
    )
      .then((res) => res.text())
      .then(async (markdown) => {
        const file = await remark()
          .use(remarkGfm)
          .use(remarkRehype)
          .use(rehypeHighlight)
          .use(rehypeStringify)
          .process(markdown);
        setHtml(String(file));
      });
  }, []);

  return (
    <main className="flex flex-col items-center justify-center">
      <div
        className="max-w-none bg-[#0d111767] text-left"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <br />
    </main>
  );
}
