import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  if (!session?.user) {
    return (
      <main>
        <h1>Not signed in</h1>
      </main>
    );
  }

  return (
    <main className="w-1/3">
      <h1>Signed in</h1>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre>; */}
    </main>
  );
}
