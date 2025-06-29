"use client"

import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  const toTop = () => {
    return window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header>
      <Link href="/" className="absolute"><Image src="/logo.png" width={32} height={32} alt="logo" /></Link>
      <button title="scroll to top"
        className="fixed bottom-8 right-8 rounded-full p-1 shadow-lg shadow-zinc-950/50 hover:bg-zinc-800 transition-colors duration-200"
        onClick={toTop}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3-3 3" />
        </svg>
      </button>
      <nav className="grid grid-cols-[auto_max-content] gap-4 w-full py-2">
        <div></div>
        <div className="grid grid-cols-[repeat(7,auto)] gap-4">
          <Link href="/posts" title="Blog">
            <span className="hidden md:inline">Blog</span>
            <div className="ri-article-fill md:hidden"></div>
          </Link>
          <Link href="/projects" title="Projects">
            <span className="hidden md:inline">Projects</span>
            <div className="ri-lightbulb-fill md:hidden"></div>
          </Link>
          <Link href="/tools" title="Tools">
            <span className="hidden md:inline">Tools</span>
            <div className="ri-hammer-fill md:hidden"></div>
          </Link>
          <a href="https://x.com/yangjinfe" target="_blank" title="X">
            <div className="ri-twitter-fill" />
          </a>
          <a href="https://github.com/niexia" target="_blank" title="Bluesky">
            <div className="ri-github-fill" />
          </a>
          {/* <a href="/feed.xml" target="_blank" title="RSS">
            <div className="font-size:1.25rem; margin: 0 -0.125rem;" />
          </a> */}
        </div>
      </nav>
    </header>
  );
};

export { NavBar };