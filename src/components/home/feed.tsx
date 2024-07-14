import { getAllPosts } from "@/db/queries/posts";
import { Post } from "./post";

export const Feed = async () => {
  const posts = await getAllPosts();
  return (
    <div className="flex flex-col overflow-y-auto scrollbar-thin scrollbar-track-slate-400 scrollbar-thumb-slate-700 scrollbar-thumb-rounded-full">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
