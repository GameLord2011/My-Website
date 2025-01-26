"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
    const [repos, setRepos] = useState<string[]>([]);

    const username = "gamelord2011";

    useEffect(() => {
        async function fetchRepos() {
            try {
                const response = await fetch(`https://api.github.com/users/${username}/repos`);
                const data = await response.json();
                const repoNames = data.map((repo: { name: string }) => repo.name);
                setRepos(repoNames);
                console.log(repoNames);
            } catch (error) {
                console.error('Error fetching repos:', error);
            }
        }

        fetchRepos();
    }, []);

    return (
        <main className="flex flex-col items-center justify-center">
            <h1 className="text-2xl">My GitHub Repositories:</h1>
            <br/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos.map((repo) => (
                    <div key={repo} className="border p-4 rounded border-black dark:border-white">
                        <h2 className="text-xl"><Link href={`https://github.com/${username}/${repo}/`}>{repo}</Link></h2>
                    </div>
                ))}
            </div>
        </main>
    );
}