import Link from "next/link";

import { UserBadge } from "./user-badge";

export default async function SideNav() {
  return (
    <div className="fixed w-screen left-0 top-0">
      <div className="hidden lg:block w-1/3">
        <aside className="flex flex-col h-screen gap p-4 items-center">
          <h1 className="text-4xl font-extralight mt-10 mb-20">Chirp</h1>
          <NavLinks />
          <UserBadge />
        </aside>
      </div>
    </div>
  );
}

function NavLinks() {
  return (
    <nav className="grow flex flex-col gap-10 text-2xl">
      <Link href="/">Home</Link>
      <Link href="/me">Profile</Link>
    </nav>
  );
}
