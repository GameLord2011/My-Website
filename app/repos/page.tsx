"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Page() {

  console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);

  const reposFetched = useRef(false);

  const [repos, setRepos] = useState<
    { name: string; description: string; id: number; fork: boolean }[]
  >([]);
  const [emojis, setEmojis] = useState<{ [key: string]: string }>({}); // To store GitHub emojis

  const username = "gamelord2011";

  // Fetch repositories & emojis from GitHub API
  useEffect(() => {
    async function fetchRepos() {
      try {
        let response;
        if (process.env.NODE_ENV === "development" || "test") {
          response = await fetch(
            "/Tests/gitrepos.json"
          )
        }
        if(process.env.NODE_ENV === "production") {
          response = await fetch(
            `https://api.github.com/users/${username}/repos`,
          );
        }
        if (!response) {
          throw new Error("Failed to fetch repositories");
        }
        const data = await response.json();
        const formattedRepos = data.map(
          (repo: { name: string; description: string; id: number; fork: boolean }) => ({
            name: repo.name || "No name available",
            description: repo.description || null,
            id: repo.id,
            fork: repo.fork,
          }),
        );
        console.log("Repos: ", formattedRepos);
        setRepos(formattedRepos);
      } catch (error) {
        console.error("Failed to fetch repositories: ", error);
      }
    }

    fetchRepos();
    reposFetched.current = !reposFetched.current;
  }, []);

  useEffect(() => {
    async function fetchEmojis() {
      if(process.env.NODE_ENV === "production") {
        try {
          const response = await fetch("https://api.github.com/emojis");
          const data = await response.json();
          setEmojis(data); // Store emojis as key-value pairs
        } catch (error) {
          console.error("Failed to fetch emojis, error: ", error);
        }
      }
    }

    fetchEmojis();
  }, [repos]);

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
            alt={part}
            title={part}
            width={0}
            height={0}
            className="inline h-[1em] w-[1em]"
            loading="eager"
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 novisited">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="bz30:rounded-sm bz30:border bz30:border-black bz30:dark:border-white bg-black/30 p-4 backdrop-blur-xs dark:bg-white/30"
          >
            <h2 className="text-xl">
              <Link href={`https://github.com/${username}/${repo.name}/`}>
                {repo.name}
              </Link>
            </h2>
            {repo.description !== null && (
              <p className="hidden md:block">
                {renderWithEmojis(repo.description)}
              </p>
            )}
            {repo.fork && 'Forked Repo.'}
          </div>
        ))}
      </div>
    </main>
  );
}
