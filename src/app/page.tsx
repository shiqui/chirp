import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex items-center justify-center h-screen">
      {JSON.stringify(session, null, 2)}
    </main>
  );
}
