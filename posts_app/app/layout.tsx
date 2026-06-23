import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Posts App",
  description: "A simple Next.js and Prisma posts application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-900 font-sans">
        <div className="min-h-full">
          <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="text-xl font-semibold text-slate-950">
                Posts App
              </Link>
              <nav className="flex items-center gap-6 text-sm font-medium text-slate-700">
                <Link href="/" className="transition hover:text-slate-950">
                  Posts
                </Link>
                <Link href="/drafts" className="transition hover:text-slate-950">
                  Drafts
                </Link>
                <Link
                  href="/posts/create"
                  className="rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-slate-900 transition hover:bg-slate-200"
                >
                  Add Post
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
