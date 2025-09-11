import { auth } from "@/lib/auth";
import UserCard from "./user-card";
import Link from "next/link";
import { Bird, CircleUser, Telescope, UserRoundCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ThemeToggle } from "./theme-toggle";
import TopEmoji from "./top-emoji";
import { CreatePostDrawer } from "../feed/create-post-form";
import { SignInAvatar, SignOutAvatar } from "./sign-in-avatar";

const navLinks = [
  { href: "/", label: "Feed", logo: <Telescope /> },
  { href: "/following", label: "Following", logo: <UserRoundCheck /> },
  { href: "/profile", label: "Profile", logo: <CircleUser /> },
];

export async function SideNav() {
  const session = await auth();
  return (
    <aside className="fixed top-0 left-0 w-1/2 lg:w-1/3 flex flex-col items-center h-full p-6">
      <h1 className="text-2xl font-bold tracking-wide mb-4 flex items-center gap-2">
        Chirp
        <Bird />
      </h1>

      <Separator />

      <nav className="grow flex flex-col items-start p-4 gap-2">
        {navLinks.map((item) => (
          <Link href={item.href} key={item.label}>
            <Button variant="ghost" className="w-full justify-start text-lg">
              {item.logo}
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      <UserCard session={session} />
    </aside>
  );
}

export async function MobileNav() {
  const session = await auth();
  return (
    <aside className="fixed z-10 bottom-0 left-0 w-full bg-background border-t border-border sm:hidden">
      <nav className="grow flex flex-row justify-around py-2 px-6">
        <div>
          <CreatePostDrawer session={session} />
        </div>
        {navLinks.map((item) => (
          <Link href={item.href} key={item.label}>
            <Button
              variant="ghost"
              className="flex flex-col w-full justify-start text-sm h-fit gap-0"
            >
              {item.logo}
              <p>{item.label}</p>
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export async function TopNav() {
  const session = await auth();

  return (
    <div className="fixed top-0 left-0 z-20 w-full p-4 bg-background border-b border-border grid grid-cols-3 items-center">
      <div>
        {session ? <SignOutAvatar session={session} /> : <SignInAvatar />}
      </div>
      <div className="flex justify-center">
        <Bird />
      </div>
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
    </div>
  );
}

export async function RightPane() {
  return (
    <div className="fixed top-0 right-0 p-6 w-1/3">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
      <div className="mt-20">
        <TopEmoji />
      </div>
    </div>
  );
}
