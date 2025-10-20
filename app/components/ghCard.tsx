import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";

// Simple in-memory cache for GitHub API responses
type GitHubCardData = {
    avatar_url?: string;
    login?: string;
    name?: string;
    full_name?: string;
    stargazers_count?: string | number;
    description?: string;
    followers?: string | number;
};

const githubCardCache = new Map<string, GitHubCardData>();

type GitHubCardProps = {
    url: string;
};

export default function GitHubCard({ url }: GitHubCardProps) {
    const [data, setData] = useState<{
        avatar_url?: string;
        login?: string;
        name?: string;
        full_name?: string;
        stargazers_count?: string | number;
        description?: string;
        followers?: string | number;
    } | null>(null);

    useEffect(() => {
        // Check cache first
        if (githubCardCache.has(url)) {
            Promise.resolve().then(() => {
                setData(githubCardCache.get(url) ?? null);
            });
            return;
        }

        // Determine if it's a user/org or repo link
        const match = url.match(/github\.com\/([^\/]+)(?:\/([^\/]+))?/);
        if (!match) return;
        const [, user, repo] = match;

        if (
            process.env.NODE_ENV === "development" ||
            process.env.NODE_ENV === "test"
        ) {
            fetch("/Tests/user.json")
                .then((res) => res.json())
                .then((res) => {
                    setData(res);
                });
        } else {
            const apiUrl = repo
                ? `https://api.github.com/repos/${user}/${repo}`
                : `https://api.github.com/users/${user}`;

            fetch(apiUrl)
                .then((res) => res.json())
                .then((result) => {
                    githubCardCache.set(url, result);
                    setData(result);
                });
        }
    }, [url]);

    if (!data) return null;

    return (
        <span className="absolute z-[1000000000000000000000000000000] mt-2 w-64 rounded-lg border bg-white p-4 shadow-lg dark:bg-gray-800">
            {data.avatar_url && (
                <Image
                    src={data.avatar_url}
                    alt={(data?.login || data?.name) as string}
                    className="relative left-5/12 mb-2 h-12 w-12 rounded-full"
                    width={0}
                    height={0}
                />
            )}
            <span className="font-bold">
                {data.full_name || data.name || data.login}
            </span>{" "}
            {data.description && (
                <span className="text-sm">{data.description}</span>
            )}
            {data.stargazers_count !== undefined && (
                <span className="mt-2 text-xs">
                    ⭐ {data.stargazers_count} stars
                </span>
            )}
            {data.followers !== undefined && (
                <span className="mt-2 text-xs">
                    👥 {data.followers} followers
                </span>
            )}
        </span>
    );
}
