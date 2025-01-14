import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's05.flagcounter.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
