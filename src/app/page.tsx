import { Feed } from "./components/feed";
import CreatePostForm from "./components/create-post-form";

export default async function Home() {
  return (
    <main className="flex w-full flex-col gap-3">
      <CreatePostForm />
      <Feed />
    </main>
  );
}
