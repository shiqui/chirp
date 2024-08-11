import BottomNav from "@/components/home/bottom-nav";
import SideNav from "@/components/home/side-nav";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chirp",
  description: "Share your thoughts through emojis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark overflow-x-hidden`}>
        <SessionProvider>
          <div className="w-screen min-h-screen">
            <SideNav />
            <div className="flex h-full min-h-screen w-full flex-row justify-center">
              <div className="w-full lg:w-1/3 py-8 z-10 p-3">{children}</div>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
