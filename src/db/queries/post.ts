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

export async function getEmojisOfTheDay() {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const postsToday = await db.query.posts.findMany({
    with: { author: true },
    where: (posts, { gt }) => gt(posts.createdAt, oneDayAgo),
  });
  if (!postsToday) {
    return [] as [string, number][];
  }

  const frequencyMap = new Map<string, number>();
  postsToday.forEach((post) => {
    const content = post.content ?? "";
    const groups = content.matchAll(
      /(?:\p{Emoji}(?:\p{Emoji_Modifier}|\uFE0F)?(?:\u200D\p{Emoji})*)/gu
    );
    groups.forEach((emojis) => {
      emojis.forEach((emoji) => {
        frequencyMap.set(emoji, (frequencyMap.get(emoji) || 0) + 1);
      });
    });
  });

  return Array.from(frequencyMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
}
