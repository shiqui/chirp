import { getAllPosts } from "@/db/queries/posts";
import { Post } from "./post";

export const Feed = async () => {
  const posts = await getAllPosts();
  return (
    <div className="flex w-full flex-col gap-3">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
