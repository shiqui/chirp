import { getAllPosts } from "@/db/queries/posts";
import { Post } from "./post";

export const Feed = async () => {
  const posts = await getAllPosts();
  return (
    <div className="scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-400 flex flex-col overflow-y-auto">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
