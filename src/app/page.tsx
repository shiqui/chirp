import { Feed } from "./components/feed";
import CreatePostForm from "./components/create-post-form";

export default async function Home() {
  return (
    <main className="flex w-1/3 flex-col gap-3">
      <CreatePostForm />
      <Feed />
    </main>
  );
}
