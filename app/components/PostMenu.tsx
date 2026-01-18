"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type Heading = { id: string; text: string; level: number };

/**
 * 将文本转换为 URL 友好的 slug
 * 
 * 该函数执行以下操作：
 * 1. 将文本转换为小写
 * 2. 去除首尾空格
 * 4. 将连续的空格替换为单个连字符
 * 5. 合并连续的连字符
 * 
 * @param s 要转换的文本字符串
 * @returns URL 友好的 slug 字符串
 * 
 * @example
 * slugify("Hello World!") // 返回 "hello-world"
 * slugify("  How to Create a Slug?  ") // 返回 "how-to-create-a-slug"
 * slugify("Multiple---Hyphens") // 返回 "multiple-hyphens"
 */
function slugify(s: string) {
  return s
    .toLowerCase()   // 转换为小写
    .trim()          // 去除首尾空格
    .replace(/\s+/g, "-")          // 将空格替换为连字符
    .replace(/-+/g, "-");          // 合并连续的连字符
}

function indentClass(level: number) {
  if (level === 2) return "pl-0";
  if (level === 3) return "pl-3";
  if (level >= 4) return "pl-6";
  return "";
}

function transferNodeToHeading(nodes: HTMLElement[]) {
  return nodes.map((node) => {
    let id = node.id;
    // ensure unique id
    if (!id) {
      id = slugify(node.textContent || "");
      let unique = id;
      let i = 1;
      while (document.getElementById(unique)) {
        unique = `${id}-${i++}`;
      }
      id = unique;
      node.id = id;
    }
    // give headings a bit of scroll margin so anchor links aren't hidden behind sticky header
    // node.style.scrollMarginTop = "6rem";
    return {
      id,
      text: node.textContent || "",
      level: Number(node.tagName[1])
    };
  });
}

function PostMenu() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowMenu(!!(pathname && pathname.startsWith("/posts/")));
  }, [pathname]);

  useEffect(() => {
    if (!showMenu) {
      setHeadings([]);
      setActiveId(null);
      setMobileOpen(false);
      return;
    }

    const content = document.getElementById("post-content");
    if (!content) {
      setHeadings([]);
      return;
    }
    const nodes = Array.from(content.querySelectorAll("h2,h3")) as HTMLElement[];

    const headings = transferNodeToHeading(nodes)
    setHeadings(headings);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId((prev) => entry.target.id || prev);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -70% 0px", threshold: [0, 0.1, 0.5] }
    );
    nodes.forEach((n) => observer.observe(n));

    return () => observer.disconnect();
  }, [pathname, showMenu]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  const list = useMemo(() => {
    return (
      <ul className="space-y-1">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li key={h.id} className="relative">
              <a
                href={`#${h.id}`}
                onClick={() => setMobileOpen(false)}
                className={`flex items-start gap-2 no-underline px-1 py-0.5 transition-colors duration-150 break-words ${isActive ? "text-zinc-900 dark:text-zinc-100 font-semibold" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-100"} `}
                aria-current={isActive ? "location" : undefined}
              >
                <span className={`${isActive ? "bg-emerald-400" : "bg-transparent"} w-1 rounded h-5`} />
                <span className={`${indentClass(h.level)} text-sm`}>{h.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }, [activeId, headings]);

  if (!showMenu || headings.length === 0) return null;

  return (
    <>
      <nav className="hidden xl:block fixed top-32 right-8 w-56 max-h-[calc(100vh-10rem)] overflow-auto">
        <div className="mb-3 pl-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">ON THIS PAGE</div>
        {list}
      </nav>

      <button
        type="button"
        className="xl:hidden fixed bottom-8 right-6 z-40 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 px-3 py-1.5 text-sm shadow-lg shadow-black/10"
        onClick={() => setMobileOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={mobileOpen}
        aria-controls="post-menu-dialog"
      >
        目录
      </button>

      <div
        className={`xl:hidden fixed inset-0 z-50 ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          id="post-menu-dialog"
          role="dialog"
          aria-modal="true"
          className={`absolute left-0 right-0 bottom-0 rounded-t-2xl bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 max-h-[70vh] overflow-auto transition-transform ${mobileOpen ? "translate-y-0" : "translate-y-full"}`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
            <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">ON THIS PAGE</div>
            <button
              type="button"
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              onClick={() => setMobileOpen(false)}
            >
              关闭
            </button>
          </div>
          <div className="px-4 py-3">{list}</div>
        </div>
      </div>
    </>
  );
}

export { PostMenu };
