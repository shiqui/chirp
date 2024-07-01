import { db } from "@/db";

export const getAllPosts = async () => {
  const posts = await db.query.posts.findMany({
    orderBy: (post, { desc }) => [desc(post.createdAt)],
    with: {
      user: true,
    },
  });
  return posts;
};
