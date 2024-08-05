import { getAllPosts } from "@/db/queries/posts";

import { Post } from "./post";

export const Feed = async () => {
  const posts = await getAllPosts();
  return (
    <div className="flex flex-col overflow-y-auto z-10">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};
