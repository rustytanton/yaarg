import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css";
import SiteHeader from '@/app/_lib/components/SiteHeader'
import ToastProvider from "@/app/_lib/components/ToastProvider";


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
    <html lang="en">
      <body className={inter.className + " flex flex-col items-center"}>
        <SiteHeader />
        <main className="m:w-3/4 flex flex-col items-center">
          <ToastProvider>{children}</ToastProvider>
        </main>
      </body>
    </html>
  );
}
