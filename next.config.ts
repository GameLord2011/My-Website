import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [new URL("https://github.githubassets.com/**")],
        unoptimized: true,
    },
    allowedDevOrigins: ["10.0.0.125"],
};

export default nextConfig;
