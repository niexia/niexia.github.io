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
  description: "杨金的个人博客，分享生活、技术和阅读 | Yang Jin's personal blog, sharing insights on life, technology, and reading.",
  keywords: ["杨金", "Yang Jin", "前端工程师", "个人博客", "技术分享", "Front-end Engineer", "Personal Blog", "Technology"],
  openGraph: {
    title: "Yang Jin (杨金)'s Blog",
    description: "杨金的个人博客，分享生活、技术和阅读 | Yang Jin's personal blog, sharing insights on life, technology, and reading.",
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
        <meta name="google-site-verification" content="gogjeUvgmxhMwuD2GEIWiR3tjeiYHGJRZVIRLWmZBHM" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <div className="min-h-screen flex flex-col pt-0 md:pt-8 p-8 dark:bg-zinc-950 bg-white text-gray-900 dark:text-zinc-200">
          <NavBar />
          <main className="max-w-[60ch] md:max-w-[80ch] mx-auto w-full space-y-6 flex-grow">
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
    { name: '@yangjinfe', url: 'https://x.com/yangjinfe' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/yangjinfe' },
    { name: 'github', url: 'https://github.com/niexia' }
  ];

  return (
    <footer className="mt-12 text-center">
      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
      <ScrollToTop />
    </footer>
  );
}

