import { count, eq, and } from "drizzle-orm";
import { db } from "..";
import { follows } from "../schema";

export async function getFollowerCountByUserId(id: string) {
  const [{ count: follower }] = await db
    .select({ count: count() })
    .from(follows)
    .where(eq(follows.followingId, id));
  return follower;
}

export async function getFollowingCountByUserId(id: string) {
  const [{ count: following }] = await db
    .select({ count: count() })
    .from(follows)
    .where(eq(follows.followerId, id));
  return following;
}

export async function isFollowing(followerId: string, followingId: string) {
  const follow = await db
    .select()
    .from(follows)
    .where(
      and(
        eq(follows.followerId, followerId),
        eq(follows.followingId, followingId)
      )
    )
    .limit(1);
  return follow.length != 0;
}
