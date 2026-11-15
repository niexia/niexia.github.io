import type { ReactNode } from "react";
import { PostsChrome } from "../components/PostsChrome";

export default function PostsLayout({ children }: { children: ReactNode }) {
  return <PostsChrome>{children}</PostsChrome>;
}
