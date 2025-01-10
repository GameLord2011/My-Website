import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: 'out',
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },
};

export default nextConfig;
