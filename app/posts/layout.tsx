import { PostMenu } from "../components/PostMenu";

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <div id="post-content" className="min-w-0">
        {children}
      </div>
      <PostMenu />
    </div>
  );
}
