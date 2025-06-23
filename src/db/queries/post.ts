import { db } from "@/db";
import { desc } from "drizzle-orm";
import { posts } from "../schema";

export function getAllPosts() {
  return db.query.posts.findMany({
    with: { author: true },
    orderBy: [desc(posts.createdAt)],
  });
}
