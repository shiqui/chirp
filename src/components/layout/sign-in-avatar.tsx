"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export function SignInAvatar() {
  return (
    <Avatar onClick={() => signIn()}>
      <AvatarFallback className="border border-accent-foregroud" delayMs={10}>
        {""}
      </AvatarFallback>
    </Avatar>
  );
}

export function SignOutAvatar({ session }: { session: Session | null }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Avatar>
          {session?.user?.image && <AvatarImage src={session.user.image} />}
          <AvatarFallback className="border border-accent-foregroud">
            {session?.user?.name ?? ""}
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Do you want to sign out?</DialogTitle>
        </DialogHeader>
        <Button onClick={() => signOut()}>Sign out</Button>
      </DialogContent>
    </Dialog>
  );
}
