import { db } from "@/db";

export function getAllPosts() {
  return db.query.posts.findMany({ with: { author: true } });
}
