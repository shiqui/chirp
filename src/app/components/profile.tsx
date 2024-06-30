"use client";
import Image from "next/image";

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
    <div className="flex w-fit gap-3 rounded-lg border border-slate-400 p-4">
      <Image
        src={user.image ?? "/default-profile.png"}
        className="h-14 w-14 rounded-full"
        alt={`@${user.name ?? user.id}'s profile picture`}
        width={56}
        height={56}
      />
      <div className="flex flex-col">
        <span className="text-2xl">{user.name}</span>
        <div className="flex gap-1 text-slate-300">
          <span>{`@${user.id} `}</span>
        </div>
      </div>
      <button
        className="bg-slate-700 text-slate-50 rounded-md p-1"
        onClick={async () => {
          await signOutAction();
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

function SignInButton() {
  return (
    <a
      href="/api/auth/signin"
      className="bg-slate-700 text-slate-50 rounded-md p-1"
    >
      Sign In
    </a>
  );
}
