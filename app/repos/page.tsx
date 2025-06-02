"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

export default function Page() {
  const reposFetched = useRef(false);
  const emojisFetched = useRef(false);

  const [repos, setRepos] = useState<
    { name: string; description: string; id: number; fork: boolean }[]
  >([]);
  const [emojis, setEmojis] = useState<{ [key: string]: string }>({}); // To store GitHub emojis

  const username = "gamelord2011";

  const anchorcontent = useRef<HTMLAnchorElement[]>([]);
  const desccontent = useRef<HTMLSpanElement[]>([]);
  const forkedcontent = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    anchorcontent.current = [];
    desccontent.current = [];
    forkedcontent.current = [];
  }, [repos]);

  const setAnchorRef = (el: HTMLAnchorElement | null) => {
    if (el && !anchorcontent.current.includes(el)) {
      anchorcontent.current.push(el);
    }
  };

  const setDescRef = (el: HTMLSpanElement | null) => {
    if (el && !desccontent.current.includes(el)) {
      desccontent.current.push(el);
    }
  };

  const setForkedRef = (el: HTMLParagraphElement | null) => {
    if (el && !forkedcontent.current.includes(el)) {
      forkedcontent.current.push(el);
    }
  };

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrambleTextPlugin);

  useGSAP(() => {
    if (repos.length === 0) return;

    anchorcontent.current.forEach((el) => {
      gsap.to(el, {
        duration: (() => gsap.utils.random(1.5, 4, 0.1))(),
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

    desccontent.current.forEach((el) => {
      gsap.to(el, {
        duration: (() => gsap.utils.random(1.5, 4, 0.1))(),
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

    forkedcontent.current.forEach((el) => {
      gsap.to(el, {
        duration: (() => gsap.utils.random(1.5, 4, 0.1))(),
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
  }, [reposFetched.current]);

  // Fetch repositories & emojis from GitHub API
  useEffect(() => {
    async function fetchData() {
      if (reposFetched.current) return;

      try {
        let reposResponse;
        let emojisResponse;

        if (
          process.env.NODE_ENV === "development" ||
          process.env.NODE_ENV === "test"
        ) {
          reposResponse = await fetch("/Tests/gitrepos.json");
        } else if (process.env.NODE_ENV === "production") {
          reposResponse = await fetch(
            `https://api.github.com/users/${username}/repos`,
          );
          emojisResponse = await fetch("https://api.github.com/emojis");
        } else {
          reposResponse = await fetch("/Tests/gitrepos.json");
        }

        if (!reposResponse || !reposResponse.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const reposData = await reposResponse.json();
        const formattedRepos = reposData.map(
          (repo: {
            name: string;
            description: string;
            id: number;
            fork: boolean;
          }) => ({
            name: repo.name || "No name available",
            description: repo.description || null,
            id: repo.id,
            fork: repo.fork,
          }),
        );
        setRepos(formattedRepos);
        reposFetched.current = true;

        if (emojisResponse && emojisResponse.ok) {
          const emojisData = await emojisResponse.json();
          setEmojis(emojisData); // Store emojis as key-value pairs
          emojisFetched.current = true;
        }
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }
    }

    fetchData();
  }, []);

  // Replace emoji shortcodes with React elements
  const renderWithEmojis = (text: string) => {
    const parts = text.split(/(:\w+:)/g); // Split text by emoji shortcodes
    return parts.map((part, index) => {
      if (
        part.startsWith(":") &&
        part.endsWith(":") &&
        emojis[part.slice(1, -1)]
      ) {
        return (
          <>
            {" "}
            <Image
              key={index}
              src={emojis[part.slice(1, -1)]}
              alt={part.slice(1, -1)}
              title={part}
              width={20}
              height={20}
              className="box-content inline-flex aspect-square max-w-none border-none bg-transparent align-text-top"
              loading="eager"
              aria-label={part.slice(1, -1)}
            />{" "}
          </>
        );
      }
      return (
        <span ref={setDescRef} key={index}>
          {part}
        </span>
      ); // Render regular text as-is
    });
  };

  if (!reposFetched.current) {
    return (
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-2xl">My GitHub Repositories:</h1>
        <br />
        <p>loading...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-2xl">My GitHub Repositories:</h1>
      <br />
      <div className="novisited grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="bz30:rounded-sm bz30:border bz30:border-black bz30:dark:border-white max-jio2:w-full bg-white/30 p-4 backdrop-blur-xs"
          >
            <h2 className="text-xl">
              <Link
                ref={setAnchorRef}
                href={`https://github.com/${username}/${repo.name}/`}
              >
                {repo.name}
              </Link>
            </h2>
            {repo.description !== null && (
              <p className="font-ui hidden leading-[1.5] md:block">
                {renderWithEmojis(repo.description)}
              </p>
            )}
            {repo.fork && (
              <p ref={setForkedRef} className="font-ui">
                Forked repo.
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
