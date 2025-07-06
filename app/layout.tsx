import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import "./globals.css";
import { NavBar } from "./components/NavBar";

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
    default: "Yang Jin",
    template: "%s | Yang Jin",
  },
  description: "This is my portfolio, blog, and personal website. About life, technology and reading.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="gogjeUvgmxhMwuD2GEIWiR3tjeiYHGJRZVIRLWmZBHM" />
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function () {
              const userTheme = localStorage.theme;
              const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
              const dark = userTheme === "dark" || systemDark;
              document.documentElement.classList.toggle("dark", dark);
            })();
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-zinc-950 bg-white text-gray-900 dark:text-zinc-200">
          <NavBar />
          <main className="max-w-[60ch] md:max-w-[80ch] mx-auto w-full space-y-6">
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
    </footer>
  );
}

