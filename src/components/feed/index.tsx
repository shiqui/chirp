import { getAllPosts, getFollowingPosts } from "@/db/queries/post";
import { PostCard } from "./post-card";

export async function Feed() {
  const posts = await getAllPosts(100);
  return (
    <div className="flex flex-col gap-4 p-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export async function FollowingFeed() {
  const posts = await getFollowingPosts(100);
  return (
    <div className="flex flex-col gap-4 p-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
