import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const isSsgBuild = process.env.SSG === 'true';

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // mdxRs 内置 GFM 支持，不需要 remark-gfm 插件
  experimental: {
    mdxRs: {
      mdxType: 'gfm',
    },
  },
};

const nextSSGConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    mdxRs: {
      mdxType: 'gfm',
    },
  },
};

const withMDX = createMDX({});

export default withMDX(isSsgBuild ? nextSSGConfig : nextConfig);
