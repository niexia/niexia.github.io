import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { NavBar } from "./components/NavBar";
import { ScrollToTop } from "./components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Yang Jin (杨金)",
    template: "%s | Yang Jin",
  },
  description: "Yang Jin's personal blog about front-end engineering, performance, browser internals, and software design, plus notes on life and reading. RSS available. 杨金的个人博客，分享前端工程化、性能优化、浏览器原理与软件设计，也记录生活与阅读思考，支持 RSS 订阅。",
  keywords: ["杨金", "Yang Jin", "前端工程师", "个人博客", "技术分享", "Front-end Engineer", "Personal Blog", "Technology", "前端工程化", "性能优化", "前端教程", "软件设计", "浏览器原理", "架构设计"],
  openGraph: {
    title: "Yang Jin (杨金)'s Blog",
    description: "Yang Jin's personal blog about front-end engineering, performance, browser internals, and software design, plus notes on life and reading. RSS available. 杨金的个人博客，分享前端工程化、性能优化、浏览器原理与软件设计，也记录生活与阅读思考，支持 RSS 订阅。",
    url: "https://yangjin.dev",
    siteName: "Yang Jin (杨金)'s Blog",
    images: [
      {
        url: "https://yangjin.dev/social.jpg",
        width: 1200,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const setting = localStorage.getItem('theme');
            if (setting === 'dark' || (prefersDark && setting !== 'light')) {
              document.documentElement.classList.add('dark');
            }
          })();
        `,
          }}
        />
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" />
        <meta name="google-site-verification" content="gogjeUvgmxhMwuD2GEIWiR3tjeiYHGJRZVIRLWmZBHM" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <div className="min-h-screen flex flex-col p-5 sm:p-8 md:pt-8 bg-background text-foreground">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-50 focus:rounded-sm focus:bg-zinc-900 focus:px-3 focus:py-2 focus:text-sm focus:text-white dark:focus:bg-zinc-100 dark:focus:text-zinc-900"
          >
            Skip to content
          </a>
          <NavBar />
          <main id="main-content" tabIndex={-1} className="w-full flex-grow">
            {children}
          </main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}


function Footer() {
  const links = [
    { name: 'X / @yangjinfe', url: 'https://x.com/yangjinfe' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/yangjinfe' },
    { name: 'GitHub', url: 'https://github.com/niexia' },
  ];

  return (
    <footer className="mt-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 border-t border-zinc-300 pt-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Yang Jin</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-accent"
            >
              {link.name}
            </a>
          ))}
          <a href="/rss.xml" className="transition-colors duration-200 hover:text-accent">
            RSS
          </a>
        </div>
      </div>
      <ScrollToTop />
    </footer>
  );
}
