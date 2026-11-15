import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow, PageIntro, SectionHeading } from "../components/Editorial";
import { siteUrl } from "../lib/site";

type ProjectLink = {
  label: string;
  href: string;
  internal?: boolean;
};

type FeaturedProject = {
  name: string;
  tagline: string;
  description: string;
  details: string[];
  meta: string;
  image: string;
  alt: string;
  aspect: string;
  links: ProjectLink[];
};

type ProjectRow = {
  name: string;
  description: string;
  meta: string;
  href: string;
};

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Products, open-source tools and tutorials by Yang Jin: Changicon, postMessage-catcher, front-end and TypeScript tutorials, and small libraries for the web.",
  alternates: { canonical: `${siteUrl}/projects` },
};

const featured: FeaturedProject[] = [
  {
    name: "Changicon",
    tagline: "A face for every tab.",
    description:
      "Changicon swaps any page's favicon for an emoji, a couple of characters, a Lucide icon, or an image you upload — for one page or a whole site. It is local-first, and it never reads the page itself.",
    details: ["Emoji", "Text", "Lucide icons", "Upload", "Local-first"],
    meta: "Chrome extension · 2026",
    image: "/changicon/hero.png",
    alt: "Changicon popup beside a browser with custom tab icons",
    aspect: "aspect-[16/10]",
    links: [
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/changicon/pcnnpfojchdoapfnaanpibdkjbdmglhi",
      },
      {
        label: "Source",
        href: "https://github.com/niexia/customize-tab-icon",
      },
      {
        label: "Read the story",
        href: "/posts/product/changicon",
        internal: true,
      },
    ],
  },
  {
    name: "postMessage-catcher",
    tagline: "Every cross-frame message, in one place.",
    description:
      "A DevTools extension that puts every postMessage from every frame into one searchable panel: who sent it, where it went, and what the payload was. No changes to the page required.",
    details: ["All frames", "Origin filter", "Payload view", "No page changes"],
    meta: "Developer tool · 2026",
    image: "/postmessage-catcher/panel.png",
    alt: "postMessage-catcher DevTools panel showing a list of messages",
    aspect: "aspect-[50/27]",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/niexia/postMessage-catcher",
      },
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/postmessage-catcher/henlmhlhpgnkeecjjcbhhcfmecohnilo",
      },
      {
        label: "Read the story",
        href: "/posts/product/postmessage-catcher",
        internal: true,
      },
    ],
  },
];

const tutorials: ProjectRow[] = [
  {
    name: "frontend-tutorial",
    description:
      "A long-running collection of front-end notes: JavaScript, data structures, algorithms, and webpack.",
    meta: "Tutorial · JavaScript & webpack",
    href: "https://github.com/niexia/fe-tutorial",
  },
  {
    name: "typescript-tutorial",
    description:
      "A Chinese-language introduction to TypeScript, adapted from typescripttutorial.net.",
    meta: "Tutorial · TypeScript",
    href: "https://github.com/niexia/typescript-tutorial",
  },
];

const libraries: ProjectRow[] = [
  {
    name: "html-webpack-inject-style-plugin",
    description:
      "Injects stylesheet link tags into HTML instead of inlining them — useful with webpack-rtl-plugin and content-security-policy-friendly builds.",
    meta: "webpack plugin",
    href: "https://github.com/niexia/html-webpack-inject-style-plugin",
  },
  {
    name: "vue-truncate-list",
    description:
      "A flexible Vue 2 and Vue 3 component for truncating lists with custom truncator rendering, on mobile and desktop.",
    meta: "Vue component",
    href: "https://github.com/twheeljs/vue-truncate-list",
  },
  {
    name: "url-formatter",
    description:
      "A small utility for pulling a single-line URL apart into its parameters and readable pieces.",
    meta: "JavaScript library",
    href: "https://github.com/twheeljs/url-formatter",
  },
];

function ProjectLinkRow({ project, index }: { project: ProjectRow; index: number }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
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
          {project.name}
        </h3>
        <p className="mt-1.5 max-w-[65ch] text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {project.description}
        </p>
        <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400">
          {project.meta}
        </p>
      </div>
      <Arrow
        diagonal
        className="hidden self-center text-zinc-400 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block"
      />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageIntro
        eyebrow="Work"
        title="Projects"
        meta="7 projects · open source & products"
        description="Products, open-source tools and tutorials — mostly attempts to make the web a little easier to understand."
      />

      <section
        aria-labelledby="selected-work"
        className="border-t-2 border-zinc-900 pt-4 dark:border-zinc-100"
      >
        <SectionHeading
          index="01"
          id="selected-work"
          description="Two products, and the details that make them feel finished."
        >
          Selected work
        </SectionHeading>

        <div className="mt-2">
          {featured.map((project, index) => {
            const reverse = index % 2 === 1;
            return (
              <article
                key={project.name}
                className="grid gap-6 border-t border-zinc-300 py-10 dark:border-zinc-800 lg:grid-cols-12 lg:gap-10 lg:py-14"
              >
                <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
                  <a
                    href={project.links[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.name} (opens in a new tab)`}
                    className="group block border border-zinc-200 transition-colors duration-200 hover:border-accent dark:border-zinc-800"
                  >
                    <div className={`relative ${project.aspect} overflow-hidden bg-zinc-100 dark:bg-zinc-900`}>
                      <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        sizes="(min-width: 1024px) 56vw, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </a>
                </div>

                <div
                  className={`flex flex-col lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}
                >
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
                    {project.meta}
                  </p>
                  <h3 className="mt-3 text-balance font-editorial text-3xl leading-tight sm:text-4xl">
                    <a
                      href={project.links[0].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-200 hover:text-accent"
                    >
                      {project.name}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </h3>
                  <p className="mt-2 font-editorial text-xl leading-snug text-zinc-800 dark:text-zinc-200">
                    {project.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {project.description}
                  </p>
                  <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-zinc-500 dark:text-zinc-400">
                    {project.details.join(" · ")}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-zinc-200 pt-4 text-sm dark:border-zinc-800">
                    {project.links.map((link) =>
                      link.internal ? (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="group inline-flex items-center gap-1.5 font-medium transition-colors duration-200 hover:text-accent"
                        >
                          {link.label}
                          <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      ) : (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-accent"
                        >
                          {link.label}
                          <Arrow
                            diagonal
                            className="transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ),
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="tutorials"
        className="border-t border-zinc-300 py-12 dark:border-zinc-800 lg:py-16"
      >
        <SectionHeading
          index="02"
          id="tutorials"
          description="Long-form notes that started as my own learning log."
        >
          Tutorials
        </SectionHeading>
        <div className="mt-6 divide-y divide-zinc-200 border-t border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {tutorials.map((project, index) => (
            <ProjectLinkRow key={project.name} project={project} index={index} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="libraries"
        className="border-t border-zinc-300 py-12 dark:border-zinc-800 lg:py-16"
      >
        <SectionHeading
          index="03"
          id="libraries"
          description="Small pieces of plumbing, extracted from work and shared."
        >
          Libraries & tools
        </SectionHeading>
        <div className="mt-6 divide-y divide-zinc-200 border-t border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {libraries.map((project, index) => (
            <ProjectLinkRow key={project.name} project={project} index={index} />
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-zinc-300 py-8 dark:border-zinc-800">
        <p className="max-w-[52ch] text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          Most of these are open source. Issues and pull requests are welcome.
        </p>
        <a
          href="https://github.com/niexia"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-accent"
        >
          More on GitHub
          <Arrow
            diagonal
            className="transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
