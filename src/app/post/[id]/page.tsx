import { PostCard } from "@/components/feed/post-card";
import { getPostById } from "@/db/queries/post";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(Number(id));

  if (!post) {
    return (
      <div className="pt-6 flex items-center gap-2">
        <span className="text-3xl">🤖</span>
        <span className="italic">ERR-UHHH...</span>
        <span className="text-3xl">😭</span>
        <span className="italic">
          I couldn't find this post for you... sorry!
        </span>
      </div>
    );
  }
  return (
    <main className="pt-6">
      <PostCard post={post} popup={false} />
    </main>
  );
}
