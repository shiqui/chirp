import { auth } from "@/lib/auth";
import UserCard from "./user-card";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/me", label: "Profile" },
];

export default async function SideNav() {
  const session = await auth();
  return (
    <aside className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Chirp</h1>

      <nav className="grow flex flex-col items-start p-4 space-y-2">
        {navLinks.map((item) => (
          <Link href={item.href} key={item.label}>
            {item.label}
          </Link>
        ))}
      </nav>
      <UserCard session={session} />
      <div className="grow"></div>
    </aside>
  );
}
