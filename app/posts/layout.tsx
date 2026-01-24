import { PostMenu } from "../components/PostMenu";
import { Giscus } from "../components/Giscus";

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
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
      <PostMenu />
    </div>
  );
}
