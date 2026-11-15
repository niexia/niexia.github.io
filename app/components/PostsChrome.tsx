"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Giscus } from "./Giscus";
import { PostMenu } from "./PostMenu";

export function PostsChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isArchive = pathname === "/posts" || pathname === "/posts/";

  if (isArchive) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <div className="relative w-full">
      <div className="mx-auto w-full max-w-[80ch]">
        <div id="post-content" className="min-w-0">
          {children}
        </div>
        <Giscus
          config={{
            repo: "niexia/niexia.github.io",
            repoId: "MDEwOlJlcG9zaXRvcnkxMjM1MjEzNzQ=",
            category: "General",
            categoryId: "DIC_kwDOB1zJXs4C1Xwe",
            mapping: "pathname",
            strict: "0",
            reactionsEnabled: "1",
            emitMetadata: "0",
            inputPosition: "top",
            lang: "en",
            loading: "lazy",
          }}
        />
      </div>
      <PostMenu />
    </div>
  );
}
