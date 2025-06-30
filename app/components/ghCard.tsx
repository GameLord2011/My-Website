import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";

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
    // Determine if it's a user/org or repo link
    const match = url.match(/github\.com\/([^\/]+)(?:\/([^\/]+))?/);
    if (!match) return;
    const [, user, repo] = match;
    const apiUrl = repo
      ? `https://api.github.com/repos/${user}/${repo}`
      : `https://api.github.com/users/${user}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then(setData);
  }, [url]);

  if (!data) return null;

  return (
    <span className="absolute z-[1000000000000000000000000000000] mt-2 w-64 rounded-lg border bg-white p-4 shadow-lg dark:bg-gray-800">
      {data.avatar_url && (
        <Image
          src={data.avatar_url}
          alt={(data?.login || data?.name) as string}
          className="mb-2 h-12 w-12 self-center rounded-full"
          width={0}
          height={0}
        />
      )}
      <div className="font-bold">
        {data.full_name || data.name || data.login}
      </div>
      {data.description && <div className="text-sm">{data.description}</div>}
      {data.stargazers_count !== undefined && (
        <div className="mt-2 text-xs">⭐ {data.stargazers_count} stars</div>
      )}
      {data.followers !== undefined && (
        <div className="mt-2 text-xs">👥 {data.followers} followers</div>
      )}
    </span>
  );
}
