import type { NextConfig } from "next";
import withClassnamesMinifier from "@nimpl/classnames-minifier";

const nextConfig: NextConfig = {
  images: {
    domains: ["github.githubassets.com"],
    unoptimized: true,
  },
};

const classnamesMinifierConfig = {
  disabled: process.env.NODE_ENV === 'development',
};

export default withClassnamesMinifier(classnamesMinifierConfig)(nextConfig);