"use client";

import { useEffect } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

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
    position: { top: number; left: number };
    ref?: React.Ref<HTMLDivElement>;
};

export default function GitHubCard({ url, position, ref }: GitHubCardProps) {
    const [data, setData] = useState<GitHubCardData | null>(null);

    const CARD_WIDTH = 256; // Tailwind w-64 = 16rem = 256px
    const CARD_HEIGHT = 125.48;

    const clampedLeft = Math.max(
        0,
        Math.min(position.left, window.innerWidth - CARD_WIDTH),
    );

    const clampedTop = Math.max(
        0,
        Math.min(position.top, window.innerHeight - CARD_HEIGHT),
    );

    useEffect(() => {
        if (githubCardCache.has(url)) {
            setData(githubCardCache.get(url) ?? null);
            return;
        }

        const match = url.match(/github\.com\/([^\/]+)(?:\/([^\/]+))?/);
        if (!match) return;
        const [user, repo] = match;

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

    return createPortal(
        <div
            ref={ref}
            style={{
                position: "absolute",
                top: clampedTop,
                left: clampedLeft,
                zIndex: 9999,
                width: `${CARD_WIDTH}px`,
            }}
            className="rounded-lg border bg-white p-4 shadow-lg dark:bg-gray-800"
        >
            {data.avatar_url && (
                <Image
                    src={data.avatar_url}
                    alt={data.login || data.name || "GitHub avatar"}
                    className="mx-auto mb-2 h-12 w-12 rounded-full"
                    width={48}
                    height={48}
                />
            )}
            <div className="font-bold">
                {data.full_name || data.name || data.login}
            </div>
            {data.description && (
                <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                    {data.description}
                </div>
            )}
            {data.stargazers_count !== undefined && (
                <div className="mt-2 text-xs text-gray-500">
                    ⭐ {data.stargazers_count} stars
                </div>
            )}
            {data.followers !== undefined && (
                <div className="text-xs text-gray-500">
                    👥 {data.followers} followers
                </div>
            )}
        </div>,
        document.body,
    );
}

GitHubCard.displayName = "GitHubCard";
