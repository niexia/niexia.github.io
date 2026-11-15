import type { Metadata } from "next";
import { allPosts } from "../data/allPosts";
import { PageIntro } from "../components/Editorial";
import { PostArchive } from "../components/PostArchive";
import { siteUrl } from "../lib/site";

export const metadata: Metadata = {
  title: "The archive",
  description:
    "Every note on Yang Jin's blog, newest first and grouped by year. Browse the full archive or filter it by subject.",
  alternates: { canonical: `${siteUrl}/posts` },
};

export default function PostsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageIntro
        eyebrow="Index"
        title="The archive"
        meta={`${allPosts.length} notes · since 2017`}
        description="Everything I have published, newest first. Browse by year, or narrow the archive down to the subjects you care about."
      />
      <PostArchive />
    </div>
  );
}
