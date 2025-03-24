import type { NextConfig } from "next";
const { default: classnamesMinifier } = require('@nimpl/classnames-minifier');


const nextConfig: NextConfig = {
  images: {
    domains: ["github.githubassets.com"],
    unoptimized: true,
  },
};

const withClassnamesMinifier = classnamesMinifier({
  disabled: process.env.NODE_ENV === 'development',
});

export default withClassnamesMinifier(nextConfig);