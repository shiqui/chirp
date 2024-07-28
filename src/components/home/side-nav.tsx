import Link from "next/link";

import { UserBadge } from "./user-badge";

export default async function SideNav() {
  return (
    <div className="fixed w-1/3 left-0 top-0">
      <nav className="flex flex-col h-screen gap-14 p-4 items-center">
        <h1 className="text-4xl text-">Chirp</h1>
        <div className="grow">
          <NavLinks />
        </div>
        <UserBadge />
      </nav>
    </div>
  );
}

function NavLinks() {
  return (
    <div className="flex flex-col gap-4 text-2xl">
      <Link href="/">Home</Link>
      <Link href="/me">Profile</Link>
    </div>
  );
}
