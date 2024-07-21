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

export const getPostFromId = async (id: number) => {
  const post = await db.query.posts.findFirst({
    where: (post, { eq }) => eq(post.id, id),
    with: {
      user: true,
    },
  });
  return post;
};

export const getPostFromAuthorId = async (authorId: string) => {
  const posts = await db.query.posts.findMany({
    where: (post, { eq }) => eq(post.authorId, authorId),
    orderBy: (post, { desc }) => [desc(post.createdAt)],
  });
  return posts;
};
