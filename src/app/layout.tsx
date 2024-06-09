import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YAARG - Yet Another AI Resume Generator",
  description: "Next.js / Prisma / Postgres example app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <main>
          <h1 className="p-10 w-full"><a href="/">YAARG (Yet Another AI Resume Generator)</a></h1>
          {children}
        </main>
      </body>
    </html>
  );
}
