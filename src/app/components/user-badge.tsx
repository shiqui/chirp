"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signIn, signOut } from "next-auth/react";

export function UserBadge() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex w-2/3 flex-row items-center gap-3 rounded-full border border-slate-400 p-4">
      <Avatar>
        <AvatarImage src={user?.image ?? ""} />
        <AvatarFallback>{}</AvatarFallback>
      </Avatar>

      <span className="grow text-2xl text-slate-100">{user?.name}</span>
      {session ? <SignOutButton /> : <SignInButton />}
    </div>
  );
}

function SignInButton() {
  return (
    <Button
      className="rounded-full text-slate-100"
      variant="ghost"
      onClick={() => {
        signIn();
      }}
    >
      Sign In
    </Button>
  );
}

function SignOutButton() {
  return (
    <Button
      className="rounded-full text-slate-100"
      variant="ghost"
      onClick={() => {
        signOut();
      }}
    >
      Sign Out
    </Button>
  );
}
