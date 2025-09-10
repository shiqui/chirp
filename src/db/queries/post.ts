import { db } from "@/db";
import { desc, eq } from "drizzle-orm";
import { posts } from "../schema";

export async function getAllPosts(limit: number | undefined = undefined) {
  return db.query.posts.findMany({
    with: { author: true },
    orderBy: [desc(posts.createdAt)],
    limit,
  });
}

export async function getPostById(id: number) {
  return db.query.posts.findFirst({
    with: { author: true },
    where: eq(posts.id, id),
  });
}

export async function getPostsByAuthorId(id: string) {
  return db.query.posts.findMany({
    with: { author: true },
    where: eq(posts.authorId, id),
    orderBy: [desc(posts.createdAt)],
  });
}
