import { FollowingFeed } from "@/components/feed";
import { auth } from "@/lib/auth";

export default async function FollowingPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return <p className="p-6">Sign in to see your profile</p>;
  }

  return (
    <main className="pt-6">
      <FollowingFeed />
    </main>
  );
}
