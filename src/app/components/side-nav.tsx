"use server";
import { auth, signOut } from "@/auth";
import { Profile } from "./profile";

export default async function SideNav() {
  const session = await auth();
  const user = session?.user ?? null;
  return (
    <nav className="flex flex-col w-1/3 gap-4 p-4">
      <Profile
        user={user}
        signOutAction={async () => {
          "use server";
          await signOut();
        }}
      />
    </nav>
  );
}
