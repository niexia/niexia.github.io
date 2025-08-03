import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const isSsgBuild = process.env.SSG === 'true';

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

const nextSSGConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  output: 'export',
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({});

export default withMDX(isSsgBuild ? nextSSGConfig : nextConfig);
