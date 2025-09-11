import { Feed } from "@/components/feed";
import CreatePostForm from "@/components/feed/create-post-form";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();
  return (
    <main className="relative pt-6 sm:pt-0">
      <div className="hidden sm:block sticky top-0 w-full z-10 py-6 bg-gradient-to-b from-background from-85% to-transparent">
        <CreatePostForm session={session} />
      </div>
      <Feed />
    </main>
  );
}
