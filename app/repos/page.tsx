"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const [repos, setRepos] = useState<
    { name: string; description: string; id: number }[]
  >([]);
  const [emojis, setEmojis] = useState<{ [key: string]: string }>({}); // To store GitHub emojis

  const username = "gamelord2011";

  // Fetch repositories
  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`,
        );
        const data = await response.json();
        const formattedRepos = data.map(
          (repo: { name: string; description: string; id: number }) => ({
            name: repo.name || "No name available",
            description: repo.description || "No description available",
            id: repo.id,
          }),
        );
        setRepos(formattedRepos);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    }

    fetchRepos();
  }, []);

  // Fetch GitHub emojis
  useEffect(() => {
    async function fetchEmojis() {
      try {
        const response = await fetch("https://api.github.com/emojis");
        const data = await response.json();
        setEmojis(data); // Store emojis as key-value pairs
      } catch (error) {
        console.error("Error fetching emojis:", error);
      }
    }

    fetchEmojis();
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
            alt={part}
            title={part}
            width={0}
            height={0}
            className="w-[1em] h-[1em] inline"
            loading="eager"
          />
        );
      }
      return <span key={index}>{part}</span>; // Render regular text as-is
    });
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-2xl">My GitHub Repositories:</h1>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="bz30:border p-4 bz30:rounded bz30:border-black bz30:dark:border-white"
          >
            <h2 className="text-xl">
              <Link href={`https://github.com/${username}/${repo.name}/`}>
                {repo.name}
              </Link>
            </h2>
            <p className="hidden md:block">
              {renderWithEmojis(repo.description)}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
