import { auth } from "@/auth";
import { Feed } from "./components/feed";
import CreatePostForm from "./components/create-post-form";
import { createPost } from "@/db/actions/posts";

export default async function Home() {
  const session = await auth();
  if (!session) {
    return (
      <main>
        <h1>Not signed in</h1>
      </main>
    );
  }
  if (!session.user) {
    throw new Error("No user in session");
  }
  if (!session.user.id || !session.user.name || !session.user.image) {
    throw new Error("No user ID in session");
  }
  const user = {
    id: session.user.id,
    name: session.user.name,
    image: session.user.image,
  };

  return (
    <main className="flex w-1/3 flex-col gap-3">
      <CreatePostForm user={user} action={createPost} />
      <Feed />
    </main>
  );
}
