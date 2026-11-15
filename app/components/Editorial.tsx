import Link from "next/link";
import type { ReactNode } from "react";

export function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 shrink-0 ${className}`}
    >
      {diagonal ? <path d="M4 12 12 4M5.5 4H12v6.5" /> : <path d="M2.5 8h11M9.5 4l4 4-4 4" />}
    </svg>
  );
}

export function SectionHeading({
  index,
  id,
  children,
  href,
  linkLabel,
  description,
}: {
  index: string;
  id: string;
  children: ReactNode;
  href?: string;
  linkLabel?: string;
  description?: string;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent" aria-hidden="true">
            {index}
          </span>
          <h2 id={id} className="font-editorial text-3xl leading-none sm:text-4xl">
            {children}
          </h2>
        </div>
        {href && linkLabel ? (
          <Link
            href={href}
            className="group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-accent"
          >
            {linkLabel}
            <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        ) : null}
      </div>
      {description ? (
        <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
  meta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
}) {
  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-zinc-300 pb-3 dark:border-zinc-800">
        <p className="font-editorial text-lg leading-none">
          <Link href="/" className="transition-colors duration-200 hover:text-accent">
            Yang Jin
          </Link>
          <span className="ml-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            / Field Notes
          </span>
        </p>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
          {meta}
        </p>
      </div>
      <header className="py-10 lg:py-14">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h1 className="mt-4 text-balance font-editorial text-[clamp(2.75rem,1.8rem+4.8vw,6.5rem)] leading-[0.95] tracking-[-0.03em]">
          {title}
        </h1>
        <p className="mt-5 max-w-[58ch] text-pretty text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
          {description}
        </p>
      </header>
    </div>
  );
}
