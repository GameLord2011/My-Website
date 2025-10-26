import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [new URL("https://github.githubassets.com/**")],
        unoptimized: true,
    },
    trailingSlash: true,
};

export default nextConfig;
