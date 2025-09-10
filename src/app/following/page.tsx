import { FollowingFeed } from "@/components/feed";
import { auth } from "@/lib/auth";

export default async function FollowingPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return (
      <div className="pt-6 flex items-center gap-2">
        <span className="text-3xl">🤖</span>
        <span className="italic">BZZZT-EEUHHH...</span>
        <span className="text-3xl">🤚</span>
        <span className="italic">
          You must be signed in to see this page...
        </span>
      </div>
    );
  }

  return (
    <main className="pt-6">
      <FollowingFeed />
    </main>
  );
}
