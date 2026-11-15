import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/posts", label: "Blog", icon: "ri-article-fill" },
  { href: "/projects", label: "Projects", icon: "ri-lightbulb-fill" },
  { href: "/Links", label: "Links", icon: "ri-links-fill" },
];

const iconLinks = [
  { href: "https://x.com/yangjinfe", label: "X (Twitter)", icon: "ri-twitter-fill" },
  { href: "https://github.com/niexia", label: "GitHub", icon: "ri-github-fill" },
  { href: "/rss.xml", label: "RSS feed", icon: "ri-rss-line", hideOnMobile: true },
];

const NavBar = () => {
  return (
    <header className="relative mx-auto w-full max-w-6xl">
      <Link
        href="/"
        aria-label="Yang Jin — home"
        className="absolute left-0 top-1/2 -translate-y-1/2"
      >
        <Image src="/logo.png" width={32} height={32} alt="" className="h-8 w-8 rounded-full" />
      </Link>
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-end gap-2.5 py-2 sm:gap-4 md:gap-5"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            title={link.label}
            aria-label={link.label}
            className="inline-flex h-8 w-8 items-center justify-center transition-colors duration-200 hover:text-accent md:h-auto md:w-auto"
          >
            <span className="hidden md:inline">{link.label}</span>
            <i className={`${link.icon} md:hidden`} aria-hidden="true" />
          </Link>
        ))}
        {iconLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            title={link.label}
            aria-label={link.label}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`${
              link.hideOnMobile ? "hidden sm:inline-flex" : "inline-flex"
            } h-8 w-8 items-center justify-center transition-colors duration-200 hover:text-accent`}
          >
            <i className={link.icon} aria-hidden="true" />
          </a>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
};

export { NavBar };
