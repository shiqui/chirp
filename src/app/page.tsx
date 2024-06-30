import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  if (!session?.user) {
    // Not signed in, redirect to sign in page
    redirect("/api/auth/signin?callbackUrl=/");
  }

  return (
    <>
      <Profile user={session.user} />
      <pre>{JSON.stringify(session, null, 2)}</pre>;
    </>
  );
}

function Profile({
  user,
}: {
  user: { name?: string | null; email?: string | null; image?: string | null };
}) {
  if (!user.name || !user.email || !user.image) {
    return <div>Null</div>;
  }
  return (
    <div className="bg-slate-50">
      <h1>{user.name}</h1>
      <Image
        src={user.image}
        alt={user.name ?? "User"}
        width={80}
        height={80}
      />
      <p>{user.email}</p>
    </div>
  );
}
