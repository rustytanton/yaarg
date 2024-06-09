import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SignIn from './components/SignIn'
import SignOut from "./components/SignOut";
import { auth } from './auth'

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
  const session = await auth()

  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <h1 className="p-10 w-full"><a href="/">YAARG (Yet Another AI Resume Generator)</a></h1>
          <div className="pl-10">
            {session && session.user
              ? <SignOut />
              : <SignIn />
            }
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
