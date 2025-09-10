import { auth } from "@/lib/auth";
import UserCard from "./user-card";
import Link from "next/link";
import { Bird, CircleUser, Newspaper, UserRoundCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const navLinks = [
  { href: "/", label: "Feed", logo: <Newspaper /> },
  { href: "/following", label: "Following", logo: <UserRoundCheck /> },
  { href: "/profile", label: "Profile", logo: <CircleUser /> },
];

export default async function SideNav() {
  const session = await auth();
  return (
    <aside className="fixed top-0 left-0 w-1/3 flex flex-col items-center h-full p-6">
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
