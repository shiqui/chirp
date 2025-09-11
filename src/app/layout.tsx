import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SideNav, MobileNav, TopNav, RightPane } from "@/components/layout/nav";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Chirp",
  description: "Emoji only!",
};

// Responsive reminder:
// sm: mobile
// md: tablet
// lg: laptop
// xl: desktop

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-full">
            <div className="sm:hidden">
              <TopNav />
            </div>

            <div className="hidden sm:block relative">
              <SideNav />
            </div>

            <div className="p-4 pt-14 pb-24 sm:p-4">{children}</div>

            <div className="hidden lg:block">
              <RightPane />
            </div>

            <div className="sm:hidden">
              <MobileNav />
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
