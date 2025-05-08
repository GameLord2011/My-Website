"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

  const reposFetched = useRef(false);
  const emojisFetched = useRef(false);

  const [repos, setRepos] = useState<
    { name: string; description: string; id: number; fork: boolean }[]
  >([]);
  const [emojis, setEmojis] = useState<{ [key: string]: string }>({}); // To store GitHub emojis

  const username = "gamelord2011";

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
        console.log("Repos: ", formattedRepos);
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
          />
        );
      }
      return <span key={index}>{part}</span>; // Render regular text as-is
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
            className="bz30:rounded-sm bz30:border bz30:border-black bz30:dark:border-white max-jio2:w-full bg-black/30 p-4 backdrop-blur-xs dark:bg-white/30"
          >
            <h2 className="text-xl">
              <Link href={`https://github.com/${username}/${repo.name}/`}>
                {repo.name}
              </Link>
            </h2>
            {repo.description !== null && (
              <p className="font-ui hidden leading-[1.5] md:block">
                {renderWithEmojis(repo.description)}
              </p>
            )}
            {repo.fork && <p className="font-ui">Forked repo.</p>}
          </div>
        ))}
      </div>
    </main>
  );
}
