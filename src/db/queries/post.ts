import { db } from "@/db";
import { desc, eq, inArray } from "drizzle-orm";
import { follows, posts } from "../schema";
import { auth } from "@/lib/auth";

export async function getAllPosts(limit: number | undefined = undefined) {
  return db.query.posts.findMany({
    with: { author: true },
    orderBy: [desc(posts.createdAt)],
    limit,
  });
}

export async function getFollowingPosts(limit: number | undefined = undefined) {
  const session = await auth();
  if (!session?.user?.id) return [];
  const followingIds = await db.query.follows
    .findMany({
      where: eq(follows.followerId, session.user.id),
    })
    .then((follows) => follows.map((follow) => follow.followingId));

  return db.query.posts.findMany({
    with: { author: true },
    where: inArray(posts.authorId, followingIds),
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
