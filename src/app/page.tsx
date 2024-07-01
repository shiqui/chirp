import { auth } from "@/auth";
import { Feed } from "./components/feed";
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
      <Feed />
    </main>
  );
}
