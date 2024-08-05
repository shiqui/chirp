import CreatePostForm from "@/components/home/create-post-form";
import { Feed } from "@/components/home/feed";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main className="flex w-full flex-col gap-3">
      <CreatePostForm />
      <Feed />
    </main>
  );
}
