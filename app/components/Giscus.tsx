"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";

function getTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  return isDark ? "dark_dimmed" : "light";
}

function postGiscusMessage(message: unknown) {
  const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
  iframe?.contentWindow?.postMessage(message, "https://giscus.app");
}

type GiscusConfig = {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping?: "pathname" | "url" | "title" | "og:title" | "specific";
  strict?: "0" | "1";
  reactionsEnabled?: "0" | "1";
  emitMetadata?: "0" | "1";
  inputPosition?: "top" | "bottom";
  lang?: string;
  loading?: "lazy" | "eager";
};

function Giscus(props: { config: GiscusConfig }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isPostPage = useMemo(() => {
    if (!pathname) return false;
    if (!pathname.startsWith("/posts/")) return false;
    const segs = pathname.split("/").filter(Boolean);
    return segs.length >= 2;
  }, [pathname]);

  useEffect(() => {
    if (!isPostPage) return;
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    script.setAttribute("data-repo", props.config.repo);
    script.setAttribute("data-repo-id", props.config.repoId);
    script.setAttribute("data-category", props.config.category);
    script.setAttribute("data-category-id", props.config.categoryId);
    script.setAttribute("data-mapping", props.config.mapping ?? "pathname");
    script.setAttribute("data-strict", props.config.strict ?? "0");
    script.setAttribute("data-reactions-enabled", props.config.reactionsEnabled ?? "1");
    script.setAttribute("data-emit-metadata", props.config.emitMetadata ?? "0");
    script.setAttribute("data-input-position", props.config.inputPosition ?? "top");
    script.setAttribute("data-theme", getTheme());
    script.setAttribute("data-lang", props.config.lang ?? "en");
    script.setAttribute("data-loading", props.config.loading ?? "lazy");

    container.appendChild(script);
  }, [isPostPage, pathname, props.config]);

  useEffect(() => {
    if (!isPostPage) return;

    const observer = new MutationObserver(() => {
      postGiscusMessage({
        giscus: {
          setConfig: {
            theme: getTheme(),
          },
        },
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [isPostPage]);

  if (!isPostPage) return null;

  return (
    <section className="mt-10">
      <div ref={containerRef} className="giscus" />
    </section>
  );
}

export { Giscus };

