import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YAARG - Yet Another AI Resume Generator",
  description: "Next.js / Prisma / Postgres example app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <body className={inter.className + " bg-white text-black"}>
          {children}
      </body>
      <SpeedInsights />
    </html>
  );
}
