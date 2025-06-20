import { Feed } from "@/components/feed";
import CreatePostForm from "@/components/feed/create-post-form";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();
  return (
    <main>
      <CreatePostForm session={session} />
      <Feed />
    </main>
  );
}
