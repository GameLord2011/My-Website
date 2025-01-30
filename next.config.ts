import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    domains: ["github.githubassets.com"],
    unoptimized: true,
  },
};

export default nextConfig;
