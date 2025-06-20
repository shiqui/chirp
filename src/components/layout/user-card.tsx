"use client";

import { Session } from "next-auth";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { signIn, signOut } from "next-auth/react";

export default function UserCard({ session }: { session: Session | null }) {
  return (
    <Card className="w-full max-w-sm flex flex-row items-center gap-4 p-6">
      <Avatar>
        <AvatarImage src={session?.user?.image ?? ""} />
        <AvatarFallback className="border border-accent-foregroud" delayMs={10}>
          {session?.user?.name ?? ""}
        </AvatarFallback>
      </Avatar>
      <span className="font-semibold grow">
        {session ? "@" + session.user?.name : "Guest"}
      </span>
      {session ? (
        <Button onClick={() => signOut()}>Sign out</Button>
      ) : (
        <Button onClick={() => signIn()}>Sign in</Button>
      )}
    </Card>
  );
}
