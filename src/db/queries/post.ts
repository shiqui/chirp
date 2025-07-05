import { db } from "@/db";
import { desc, eq } from "drizzle-orm";
import { posts } from "../schema";

export function getAllPosts() {
  return db.query.posts.findMany({
    with: { author: true },
    orderBy: [desc(posts.createdAt)],
  });
}

export function getPostById(id: number) {
  return db.query.posts.findFirst({
    with: { author: true },
    where: eq(posts.id, id),
  });
}
