import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["github.githubassets.com"],
    unoptimized: true,
  },
};

export default nextConfig;