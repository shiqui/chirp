import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import SideNav from "@/components/layout/side-nav";
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import TopEmoji from "@/components/layout/top-emoji";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chirp",
  description: "Emoji only!",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {modal}
          <div className="grid grid-cols-3 h-full">
            <div className="relative">
              <SideNav />
            </div>
            <div>{children}</div>
            <div className="relative p-6 w-full">
              <ThemeToggle />
              <TopEmoji />
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
