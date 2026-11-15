import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { compareDesc, parseISO } from "date-fns";
import { allPosts } from "./data/allPosts";
import { Arrow, SectionHeading } from "./components/Editorial";
import { formatDate, formatDuration } from "./lib/format";
import { siteUrl } from "./lib/site";

type Post = (typeof allPosts)[number];

export const metadata: Metadata = {
  title: { absolute: "Yang Jin — Field Notes" },
  description:
    "Field notes on front-end engineering, browser internals, software design, books, and the craft of getting better. By Yang Jin, a front-end engineer in Shenzhen.",
  alternates: { canonical: siteUrl },
};

const projects = [
  {
    name: "Changicon",
    href: "https://chromewebstore.google.com/detail/changicon/pcnnpfojchdoapfnaanpibdkjbdmglhi",
    description:
      "Give every browser tab a face you can recognise — an emoji, a couple of characters, or an icon of your own.",
    meta: "Chrome extension",
  },
  {
    name: "postMessage-catcher",
    href: "https://github.com/niexia/postMessage-catcher",
    description:
      "A DevTools panel that surfaces every cross-frame message, without changing a line of page code.",
    meta: "Developer tool",
  },
  {
    name: "frontend-tutorial",
    href: "https://github.com/niexia/fe-tutorial",
    description:
      "A long-running collection of front-end notes: JavaScript, data structures, algorithms, and webpack.",
    meta: "Open source · Tutorial",
  },
  {
    name: "vue-truncate-list",
    href: "https://github.com/twheeljs/vue-truncate-list",
    description:
      "A flexible Vue 2 and Vue 3 component for truncating lists with custom truncator rendering.",
    meta: "Open source · Library",
  },
];

const socials = [
  { label: "X", href: "https://x.com/yangjinfe" },
  { label: "GitHub", href: "https://github.com/niexia" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yangjinfe" },
  { label: "RSS", href: "/rss.xml" },
];

export default function Home() {
  const posts = [...allPosts].sort((a, b) =>
    compareDesc(parseISO(a.metadata.date), parseISO(b.metadata.date)),
  );
  const lead = posts[0];
  const latest = posts.slice(1, 7);
  const leadTags = lead?.metadata.tag ?? [];
  const leadDuration = formatDuration(lead?.metadata.duration);

  if (!lead) return null;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <header className="mt-10 flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-zinc-900 pb-3 dark:border-zinc-100">
        <p className="font-editorial text-2xl leading-none">Yang Jin</p>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
          Field notes on software & craft
        </p>
      </header>

      <section
        aria-labelledby="cover-title"
        className="grid gap-10 pb-12 pt-10 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-14"
      >
        <article className="flex flex-col lg:col-span-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">
              <span aria-hidden="true" className="size-1.5 bg-accent" />
              Cover story
            </span>
            {leadTags.length > 0 ? (
              <>
                <span aria-hidden="true" className="h-3 w-px bg-zinc-300 dark:bg-zinc-700" />
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  {leadTags.join(" · ")}
                </span>
              </>
            ) : null}
          </div>

          <h1
            id="cover-title"
            className="mt-5 text-balance font-editorial text-[clamp(2.5rem,1.55rem+4.1vw,5.25rem)] leading-[0.98] tracking-[-0.025em]"
          >
            <Link
              href={lead.url}
              className="transition-colors duration-200 hover:text-accent"
            >
              {lead.metadata.title}
            </Link>
          </h1>

          <p className="mt-6 max-w-[58ch] text-pretty text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            {lead.metadata.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 pt-4 dark:border-zinc-800 lg:mt-auto">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
              <time dateTime={lead.metadata.date}>{formatDate(lead.metadata.date)}</time>
              {leadDuration ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{leadDuration}</span>
                </>
              ) : null}
            </div>
            <Link
              href={lead.url}
              className="group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-accent"
            >
              Read the story
              <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </article>

        <aside
          aria-label="Work at TikTok Ads"
          className="flex flex-col border-t border-zinc-200 pt-6 dark:border-zinc-800 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-1"
        >
          <div className="flex items-center gap-4">
            <Image
              src="/avatar.jpg"
              alt=""
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover grayscale"
            />
            <p className="font-editorial text-xl leading-tight">
              Yang Jin <span className="font-sans text-sm text-zinc-500">杨金</span>
            </p>
          </div>

          <div className="mt-7">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
              Work at
            </p>
            <p className="mt-3 font-editorial text-2xl leading-none">TikTok Ads</p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Front-end engineer · Shenzhen
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              I work on the TikTok Ads interface team, building the interfaces advertisers
              use to manage campaigns — with a focus on component architecture, rendering
              performance, and stability.
            </p>
            <dl className="mt-5 text-sm">
              <div>
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                  Off the clock
                </dt>
                <dd className="mt-0.5 text-zinc-600 dark:text-zinc-400">
                  Cycling, hiking, badminton, swimming, reading.
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 flex flex-col gap-6 border-t border-zinc-200 pt-4 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between lg:mt-auto lg:block">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="transition-colors duration-200 hover:text-accent"
                >
                  {social.label}
                </a>
              ))}
            </div>

            <dl className="grid max-w-xs grid-cols-2 gap-4 lg:mt-8">
              <div>
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  Notes
                </dt>
                <dd className="mt-1 font-editorial text-2xl leading-none">{posts.length}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  Writing since
                </dt>
                <dd className="mt-1 font-editorial text-2xl leading-none">2017</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>

      <section
        aria-labelledby="latest-notes"
        className="border-t-2 border-zinc-900 pb-12 pt-4 dark:border-zinc-100 lg:pb-16"
      >
        <SectionHeading
          index="01"
          id="latest-notes"
          href="/posts"
          linkLabel={`All ${posts.length} notes`}
          description="Newer first — software, systems, and the occasional detour."
        >
          Latest notes
        </SectionHeading>

        <ol
          start={2}
          className="mt-8 divide-y divide-zinc-200 border-t border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800"
        >
          {latest.map((post: Post, index: number) => {
            const tags = post.metadata.tag ?? [];
            const duration = formatDuration(post.metadata.duration);
            return (
              <li key={post.url}>
                <Link
                  href={post.url}
                  className="group grid grid-cols-[2rem_1fr] gap-x-4 gap-y-1 py-5 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6 sm:py-6"
                >
                  <span
                    aria-hidden="true"
                    className="pt-1 font-editorial text-xl leading-none text-zinc-300 transition-colors duration-200 group-hover:text-accent dark:text-zinc-700"
                  >
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-balance font-editorial text-xl leading-snug transition-colors duration-200 group-hover:text-accent sm:text-2xl">
                      {post.metadata.title}
                    </h3>
                    {post.metadata.description ? (
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {post.metadata.description}
                      </p>
                    ) : null}
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
                      <time dateTime={post.metadata.date}>{formatDate(post.metadata.date)}</time>
                      {duration ? (
                        <>
                          <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
                            /
                          </span>
                          <span>{duration}</span>
                        </>
                      ) : null}
                      {tags.length > 0 ? (
                        <>
                          <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
                            /
                          </span>
                          <span>{tags.join(" · ")}</span>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <Arrow className="hidden self-center text-zinc-400 transition-transform duration-200 group-hover:translate-x-1 sm:block" />
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section
        aria-labelledby="selected-work"
        className="border-t border-zinc-300 py-12 dark:border-zinc-800 lg:py-16"
      >
        <SectionHeading
          index="02"
          id="selected-work"
          href="/projects"
          linkLabel="All projects"
          description="Things I have built, maintained, or written down for other people."
        >
          Selected work
        </SectionHeading>

        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {projects.map((project, index) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-t border-zinc-300 pt-4 transition-colors duration-200 hover:border-accent dark:border-zinc-800"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  aria-hidden="true"
                  className="font-mono text-[0.7rem] tracking-[0.18em] text-zinc-400 dark:text-zinc-500"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Arrow
                  diagonal
                  className="text-zinc-400 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </div>
              <h3 className="mt-3 font-editorial text-2xl leading-snug transition-colors duration-200 group-hover:text-accent">
                {project.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {project.description}
              </p>
              <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                {project.meta}
              </p>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
