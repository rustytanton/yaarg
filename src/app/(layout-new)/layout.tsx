import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css";
import ToastProvider from "@/app/_lib/components/ToastProvider"
import Image from 'next/image'
import ButtonPrimary from '@/app/_lib/components/form/ButtonPrimary'
import SiteHeader from "../_lib/components/SiteHeader";

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
      <body className={inter.className + ""}>
        <main>
          <ToastProvider>
            <SiteHeader />
            {children}
          </ToastProvider>
        </main>
      </body>
    </html>
  );
}
