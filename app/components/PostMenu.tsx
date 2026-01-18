"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Heading = { id: string; text: string; level: number };

/**
 * Converts a heading text into a URL-friendly id.
 *
 * Notes:
 * - We keep this intentionally simple (lowercase + spaces to hyphens).
 * - The uniqueness guarantee is handled by checking existing DOM ids.
 * This function performs the following operations:
 * 1. Convert text to lowercase
 * 2. Trim leading and trailing spaces
 * 4. Replace consecutive spaces with a single hyphen
 * 5. Collapse consecutive hyphens into one
 * 
 * @param s The input text string to convert
 * @returns A URL-friendly slug string
 * 
 * @example
 * slugify("Hello World!") // returns "hello-world"
 * slugify("  How to Create a Slug?  ") // returns "how-to-create-a-slug"
 * slugify("Multiple---Hyphens") // returns "multiple-hyphens"
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

/**
 * Normalize heading nodes into a render-friendly list and ensure each node has a stable id.
 *
 * Why set scrollMarginTop:
 * - When navigating to an anchor, browsers align the target near the top.
 * - Without a scroll margin, the title can end up too close to the top edge (or under sticky UI),
 *   which also makes "active heading" detection unstable right after a jump.
 */
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
    node.style.scrollMarginTop = "7rem";
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

  /**
   * A cached list of heading elements inside the article. We keep elements (not ids)
   * so we can compute their absolute positions quickly without querying the DOM on every scroll.
   */
  const headingElsRef = useRef<HTMLElement[]>([]);

  /**
   * Coalesces multiple scroll events into a single computation per animation frame.
   * This reduces state churn and avoids layout thrashing.
   */
  const rafRef = useRef<number | null>(null);

  /**
   * "Click lock" to prevent the scroll-spy logic from overriding the active item while
   * a smooth scroll is in progress.
   *
   * Without this, adjacent headings (A/B) can alternate as "active" during the animation,
   * because the scroll position moves through the boundary where both headings are valid candidates.
   */
  const lockRef = useRef<{ id: string } | null>(null);

  /**
   * Releases the click lock after scrolling has been idle for a short time window.
   * This is more reliable than a fixed timeout because different devices/browsers
   * animate smooth scrolling with different durations.
   */
  const idleTimerRef = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setShowMenu(!!(pathname && pathname.startsWith("/posts/")));
  }, [pathname]);

  useEffect(() => {
    if (!showMenu) {
      setHeadings([]);
      setActiveId(null);
      setMobileOpen(false);
      lockRef.current = null;
      headingElsRef.current = [];
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      if (idleTimerRef.current != null) window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
      return;
    }

    const content = document.getElementById("post-content");
    if (!content) {
      setHeadings([]);
      return;
    }

    /**
     * We only need to track h2/h3 for now (matches the TOC depth we render).
     * If you later add h4+ to the menu, update this selector and indentClass.
     */
    const nodes = Array.from(content.querySelectorAll("h2,h3")) as HTMLElement[];

    const headings = transferNodeToHeading(nodes);
    setHeadings(headings);
    headingElsRef.current = nodes;

    /**
     * Scroll-spy strategy (instead of IntersectionObserver):
     * - IO callbacks depend on intersection threshold and entry ordering.
     * - During smooth scrolling / fast wheel scrolling, multiple headings can be intersecting,
     *   and the last delivered entry can overwrite the "correct" active id.
     *
     * Here we compute active based on current scrollY:
     * - Choose the heading whose top is the closest one that is above a "virtual top line".
     * - This makes active selection stable and deterministic.
     */
    const computeActive = () => {
      const lock = lockRef.current;
      if (lock) {
        setActiveId((prev) => (prev === lock.id ? prev : lock.id));
        return;
      }

      /**
       * Virtual top line offset (px) used for determining the active heading.
       * Think of it as "the reading line" slightly below the top of the viewport.
       */
      const threshold = 120;
      const y = window.scrollY + threshold;
      let bestId: string | null = null;
      let bestTop = Number.NEGATIVE_INFINITY;
      for (const el of headingElsRef.current) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= y && top > bestTop) {
          bestTop = top;
          bestId = el.id;
        }
      }
      if (!bestId && headingElsRef.current[0]) bestId = headingElsRef.current[0].id;
      if (bestId) setActiveId((prev) => (prev === bestId ? prev : bestId));
    };

    const scheduleCompute = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        computeActive();
      });
    };

    const onScroll = () => {
      /**
       * If the user clicked a TOC item, keep the active id locked to that item while
       * smooth scrolling is progressing. We consider scrolling "done" when no scroll event
       * happens for a short idle window.
       */
      if (lockRef.current) {
        if (idleTimerRef.current != null) window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = window.setTimeout(() => {
          lockRef.current = null;
          idleTimerRef.current = null;
          scheduleCompute();
        }, 160);
      }
      scheduleCompute();
    };

    const onResize = () => scheduleCompute();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const hash = window.location.hash?.slice(1);
    if (hash && nodes.some((n) => n.id === hash)) {
      setActiveId(hash);
      scheduleCompute();
    }

    const onHashChange = () => {
      const next = window.location.hash?.slice(1);
      if (next && nodes.some((n) => n.id === next)) {
        /**
         * If navigation happens via hash change (e.g. browser back/forward),
         * release any click lock and recompute based on actual scroll position.
         */
        lockRef.current = null;
        setActiveId(next);
        scheduleCompute();
      }
    };
    window.addEventListener("hashchange", onHashChange);
    scheduleCompute();

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      lockRef.current = null;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      if (idleTimerRef.current != null) window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    };
  }, [pathname, showMenu]);

  useEffect(() => {
    if (!mobileOpen) return;
    /**
     * Mobile drawer UX:
     * - Esc to close.
     * - Prevent background scrolling while the drawer is open.
     */
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
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                  e.preventDefault();

                  /**
                   * Make the UI feel instant:
                   * - update active immediately on click
                   * - then perform smooth scrolling to the target heading
                   */
                  setActiveId(h.id);
                  setMobileOpen(false);

                  /**
                   * Lock active while smooth scrolling is happening, otherwise adjacent headings
                   * can temporarily become active due to the moving scroll position.
                   */
                  lockRef.current = { id: h.id };
                  if (idleTimerRef.current != null) window.clearTimeout(idleTimerRef.current);
                  idleTimerRef.current = window.setTimeout(() => {
                    lockRef.current = null;
                    idleTimerRef.current = null;
                  }, 160);

                  const el = document.getElementById(h.id);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

                  /**
                   * Keep the URL hash in sync without triggering a full navigation.
                   * This preserves shareable URLs and back/forward behavior.
                   */
                  window.history.replaceState(null, "", `#${h.id}`);
                }}
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
