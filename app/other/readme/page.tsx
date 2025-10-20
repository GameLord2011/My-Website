"use client";

import { useEffect } from "react";
import { useState } from "react";
import { startTransition } from "react";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkGemoji from "remark-gemoji";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import "styles/github-markdown.css";
import "highlight.js/styles/github-dark.css";

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
                    .use(remarkGemoji)
                    .use(remarkRehype, { allowDangerousHtml: true })
                    .use(rehypeRaw)
                    .use(rehypeHighlight)
                    .use(rehypeStringify, { allowDangerousHtml: true })
                    .process(markdown);

                startTransition(() => {
                    setHtml(String(file));
                });
            });
    }, []);

    return (
        <main className="flex flex-col items-center justify-center">
            <div className="bg-[#0d1117]">
                <div
                    className="markdown-body p-4 text-left"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </main>
    );
}
