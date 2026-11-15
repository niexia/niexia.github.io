"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { compareDesc, parseISO } from "date-fns";
import { allPosts } from "../data/allPosts";
import { Arrow, SectionHeading } from "./Editorial";
import { formatDuration, formatMonthDay } from "../lib/format";

type Post = (typeof allPosts)[number];

const posts = [...allPosts].sort((a, b) =>
  compareDesc(parseISO(a.metadata.date), parseISO(b.metadata.date)),
);

const tagCounts = (() => {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.metadata.tag ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()].sort(
    (a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0),
  );
})();

function filterButtonClass(active: boolean) {
  return `inline-flex items-center gap-1.5 border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-150 ${
    active
      ? "border-accent bg-accent text-white dark:text-zinc-950"
      : "border-zinc-300 text-zinc-600 hover:border-accent hover:text-accent dark:border-zinc-700 dark:text-zinc-400"
  }`;
}

export function PostArchive() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts;
    return posts.filter((post) =>
      selectedTags.some((tag) => post.metadata.tag?.includes(tag) ?? false),
    );
  }, [selectedTags]);

  const groups = useMemo(() => {
    const byYear = new Map<string, Post[]>();
    for (const post of filteredPosts) {
      const year = post.metadata.date.slice(0, 4);
      const existing = byYear.get(year);
      if (existing) existing.push(post);
      else byYear.set(year, [post]);
    }
    return [...byYear.entries()];
  }, [filteredPosts]);

  const toggleTag = (tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  };

  const clearTags = () => setSelectedTags([]);

  return (
    <div>
      <section
        aria-labelledby="by-subject"
        className="border-t-2 border-zinc-900 pt-4 dark:border-zinc-100"
      >
        <SectionHeading
          index="01"
          id="by-subject"
          description="Select one or more subjects to narrow the archive."
        >
          By subject
        </SectionHeading>

        <button
          type="button"
          className="mt-5 inline-flex items-center gap-2 border border-zinc-300 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.08em] text-zinc-600 transition-colors duration-200 hover:border-accent hover:text-accent dark:border-zinc-700 dark:text-zinc-400 sm:hidden"
          aria-expanded={filtersOpen}
          aria-controls="subject-filters"
          onClick={() => setFiltersOpen((open) => !open)}
        >
          {filtersOpen
            ? "Hide subjects"
            : selectedTags.length > 0
              ? `${selectedTags.length} subject${selectedTags.length === 1 ? "" : "s"} selected`
              : "Filter by subject"}
          <span aria-hidden="true">{filtersOpen ? "−" : "+"}</span>
        </button>

        <div
          id="subject-filters"
          role="group"
          aria-label="Filter notes by subject"
          className={`${filtersOpen ? "flex" : "hidden"} mt-4 flex-wrap gap-2 sm:mt-5 sm:flex`}
        >
          <button
            type="button"
            aria-pressed={selectedTags.length === 0}
            onClick={clearTags}
            className={filterButtonClass(selectedTags.length === 0)}
          >
            All <span className="opacity-60">{posts.length}</span>
          </button>
          {tagCounts.map(([tag, count]) => (
            <button
              key={tag}
              type="button"
              aria-pressed={selectedTags.includes(tag)}
              onClick={() => toggleTag(tag)}
              className={filterButtonClass(selectedTags.includes(tag))}
            >
              {tag} <span className="opacity-60">{count}</span>
            </button>
          ))}
        </div>

        <p
          aria-live="polite"
          className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400"
        >
          {filteredPosts.length} of {posts.length} notes
        </p>
      </section>

      {groups.length > 0 ? (
        <div className="mt-12 space-y-12">
          {groups.map(([year, yearPosts]) => (
            <section
              key={year}
              aria-labelledby={`year-${year}`}
              className="grid gap-6 border-t border-zinc-300 pt-5 dark:border-zinc-800 lg:grid-cols-12 lg:gap-10"
            >
              <div className="self-start lg:sticky lg:top-10 lg:col-span-2">
                <h2
                  id={`year-${year}`}
                  className="font-editorial text-4xl leading-none sm:text-5xl"
                >
                  {year}
                </h2>
                <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  {yearPosts.length} {yearPosts.length === 1 ? "note" : "notes"}
                </p>
              </div>

              <ol className="divide-y divide-zinc-200 dark:divide-zinc-800 lg:col-span-10">
                {yearPosts.map((post, index) => {
                  const tags = post.metadata.tag ?? [];
                  const duration = formatDuration(post.metadata.duration);
                  return (
                    <li key={post.url}>
                      <Link
                        href={post.url}
                        className="group grid grid-cols-[2rem_1fr] gap-x-4 py-5 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-x-5"
                      >
                        <span
                          aria-hidden="true"
                          className="pt-1 font-editorial text-xl leading-none text-zinc-300 transition-colors duration-200 group-hover:text-accent dark:text-zinc-700"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-balance font-editorial text-xl leading-snug transition-colors duration-200 group-hover:text-accent sm:text-2xl">
                            {post.metadata.title}
                          </h3>
                          {post.metadata.description ? (
                            <p className="mt-1.5 line-clamp-2 max-w-[65ch] text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                              {post.metadata.description}
                            </p>
                          ) : null}
                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
                            <time dateTime={post.metadata.date}>
                              {formatMonthDay(post.metadata.date)}
                            </time>
                            {duration ? (
                              <>
                                <span
                                  aria-hidden="true"
                                  className="text-zinc-300 dark:text-zinc-700"
                                >
                                  /
                                </span>
                                <span>{duration}</span>
                              </>
                            ) : null}
                            {tags.length > 0 ? (
                              <>
                                <span
                                  aria-hidden="true"
                                  className="text-zinc-300 dark:text-zinc-700"
                                >
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
          ))}
        </div>
      ) : (
        <div className="mt-12 border-t border-zinc-300 py-12 dark:border-zinc-800">
          <p className="font-editorial text-2xl">No notes in this cut.</p>
          <button
            type="button"
            onClick={clearTags}
            className="mt-3 text-sm underline underline-offset-4 transition-colors hover:text-accent"
          >
            Clear subjects
          </button>
        </div>
      )}
    </div>
  );
}
