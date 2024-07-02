"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Profile({
  user,
  signOutAction,
}: {
  user: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    emailVerified?: string | null;
    image?: string | null;
  } | null;
  signOutAction: () => Promise<void>;
}) {
  if (!user) {
    return <SignInButton />;
  }
  return (
    <div className="flex w-fit flex-row gap-3 rounded-full border border-slate-400 p-4">
      <Image
        src={user.image ?? "/default-profile.png"}
        className="h-14 w-14 rounded-full"
        alt={`@${user.name ?? user.id}'s profile picture`}
        width={56}
        height={56}
      />
      <div className="flex flex-col">
        <span className="text-2xl text-slate-100">{user.name}</span>
        <span className="text-slate-300">{`@${user.id} `}</span>
      </div>
      <Button
        className="rounded-md bg-slate-700 p-1 text-slate-50"
        onClick={async () => {
          await signOutAction();
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}

function SignInButton() {
  return (
    <a
      href="/api/auth/signin"
      className="rounded-md bg-slate-700 p-1 text-slate-50"
    >
      Sign In
    </a>
  );
}
