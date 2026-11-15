import type { Metadata } from "next";
import { Arrow, PageIntro, SectionHeading } from "../components/Editorial";
import { siteUrl } from "../lib/site";

type LinkItem = {
  name: string;
  href: string;
  description: string;
};

type LinkSection = {
  id: string;
  title: string;
  description: string;
  links: LinkItem[];
};

export const metadata: Metadata = {
  title: "Links",
  description:
    "A personal reading room: blogs, podcasts, books, writing and tools that Yang Jin keeps coming back to.",
  alternates: { canonical: `${siteUrl}/Links` },
};

const sections: LinkSection[] = [
  {
    id: "blogs",
    title: "Blogs",
    description: "Sites I read regularly.",
    links: [
      {
        name: "酷壳 – CoolShell",
        href: "https://coolshell.cn/",
        description:
          "Chen Hao's long-running blog on systems, architecture and engineering culture.",
      },
      {
        name: "CatCoding",
        href: "https://catcoding.me/links/",
        description: "A programmer's notes on code, tools and the craft.",
      },
      {
        name: "overreacted",
        href: "https://overreacted.io/",
        description:
          "Dan Abramov on React, interfaces, and the way we build software.",
      },
      {
        name: "antfu",
        href: "https://antfu.me/links/",
        description:
          "Anthony Fu's notes on open source, tooling and the Vue ecosystem.",
      },
    ],
  },
  {
    id: "podcasts",
    title: "Podcasts",
    description: "Conversations worth the commute.",
    links: [
      {
        name: "bytetalk",
        href: "https://bytetalk.fm/",
        description: "Conversations about the lives of programmers.",
      },
      {
        name: "代码之外 Beyond Code",
        href: "https://bento.me/beyondcode",
        description: "GeekPlux and Randy on life beyond code.",
      },
    ],
  },
  {
    id: "books",
    title: "Books",
    description: "Books that changed how I work.",
    links: [
      {
        name: "数据结构与算法之美",
        href: "https://time.geekbang.org/column/article/40036",
        description:
          "A foundational course on data structures and algorithms.",
      },
      {
        name: "设计模式之美",
        href: "https://time.geekbang.org/column/article/215132",
        description:
          "Design patterns as a way to manage complexity and improve code quality.",
      },
      {
        name: "重构",
        href: "https://book.douban.com/subject/30468597/",
        description:
          "Martin Fowler's classic on improving the design of existing code.",
      },
      {
        name: "软件设计的哲学",
        href: "https://book.douban.com/subject/37119755/",
        description:
          "John Ousterhout on decomposing complex systems into deep modules.",
      },
      {
        name: "浏览器工作原理与实践",
        href: "https://time.geekbang.org/column/article/155183",
        description: "How browsers parse, render and paint the web.",
      },
    ],
  },
  {
    id: "writings",
    title: "Writings",
    description: "On the craft of writing.",
    links: [
      {
        name: "写作是门手艺",
        href: "https://book.douban.com/subject/35143751/",
        description: "A practical guide to writing clearly.",
      },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    description: "What I use every day.",
    links: [
      {
        name: "Visual Studio Code",
        href: "https://code.visualstudio.com/",
        description: "The editor I use every day.",
      },
      {
        name: "Excalidraw",
        href: "https://excalidraw.com/",
        description: "A simple virtual whiteboard for sketching ideas.",
      },
      {
        name: "Next.js",
        href: "https://nextjs.org/",
        description: "The React framework this site is built with.",
      },
      {
        name: "Tailwind CSS",
        href: "https://tailwindcss.com/",
        description:
          "Utility-first CSS that keeps styling close to the markup.",
      },
      {
        name: "Shadcn",
        href: "https://ui.shadcn.com/",
        description: "Components you can copy into your app and own.",
      },
    ],
  },
];

const totalLinks = sections.reduce((sum, section) => sum + section.links.length, 0);

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function LinksPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageIntro
        eyebrow="Reading room"
        title="Links"
        meta={`${totalLinks} links · a personal list`}
        description="The corners of the internet I keep coming back to: writers, podcasts, books and tools that have shaped how I work."
      />

      <div className="grid gap-10 border-t-2 border-zinc-900 pt-6 dark:border-zinc-100 lg:grid-cols-12 lg:gap-12">
        <aside className="self-start lg:sticky lg:top-10 lg:col-span-3">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">
            Contents
          </p>
          <nav aria-label="Link sections" className="mt-4">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group flex items-baseline justify-between gap-4 border-b border-zinc-200 py-2.5 text-sm transition-colors duration-200 hover:text-accent dark:border-zinc-800"
              >
                <span>
                  <span className="mr-2 font-mono text-[0.7rem] text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </span>
                <span className="font-mono text-[0.7rem] text-zinc-500">
                  {section.links.length}
                </span>
              </a>
            ))}
          </nav>
          <p className="mt-6 max-w-[30ch] text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            No affiliate links. Just things I come back to.
          </p>
        </aside>

        <div className="space-y-14 lg:col-span-9">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="scroll-mt-8"
            >
              <SectionHeading
                index={String(index + 1).padStart(2, "0")}
                id={`${section.id}-title`}
                description={section.description}
              >
                {section.title}
              </SectionHeading>

              <ul className="mt-5 divide-y divide-zinc-200 border-t border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                {section.links.map((link, linkIndex) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid grid-cols-[2rem_1fr] gap-x-4 py-4 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-x-5"
                    >
                      <span
                        aria-hidden="true"
                        className="pt-1 font-editorial text-xl leading-none text-zinc-300 transition-colors duration-200 group-hover:text-accent dark:text-zinc-700"
                      >
                        {String(linkIndex + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-balance font-editorial text-xl leading-snug transition-colors duration-200 group-hover:text-accent">
                          {link.name}
                        </h3>
                        <p className="mt-1 max-w-[68ch] text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                          {link.description}
                        </p>
                        <p className="mt-2 font-mono text-[0.7rem] tracking-[0.04em] text-zinc-500 dark:text-zinc-400">
                          {getDomain(link.href)}
                        </p>
                      </div>
                      <Arrow
                        diagonal
                        className="hidden self-center text-zinc-400 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block"
                      />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
