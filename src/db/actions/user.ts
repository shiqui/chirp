"use server";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm/sql/expressions/conditions";
import { follows, users } from "../schema";
import { db } from "..";
import { revalidatePath } from "next/cache";

type Result =
  | {
      timestamp: number;
      success: true;
    }
  | {
      timestamp: number;
      success: false;
      error: string;
    };

export async function updateUserProfile(
  currentState: Result | null,
  formData: FormData
) {
  const session = await auth();
  if (!session) {
    return {
      timestamp: Date.now(),
      success: false as const,
      error: "You must be signed in to edit your profile" as const,
    };
  }
  if (!session?.user?.id) {
    return {
      timestamp: Date.now(),
      success: false as const,
      error: "Your session has no user ID" as const,
    };
  }
  const authorId = session.user.id;

  const username = formData.get("username")?.toString();
  if (!username || username.trim().length === 0) {
    return {
      timestamp: Date.now(),
      success: false as const,
      error: "Username cannot be empty" as const,
    };
  }
  if (username.length > 30) {
    return {
      timestamp: Date.now(),
      success: false as const,
      error: "Username is too long" as const,
    };
  }

  const bio = formData.get("bio")?.toString();
  if (bio && bio.length > 160) {
    return {
      timestamp: Date.now(),
      success: false as const,
      error: "Bio is too long" as const,
    };
  }
  try {
    await db
      .update(users)
      .set({ name: username, updatedAt: new Date(), bio })
      .where(eq(users.id, authorId));
  } catch (error) {
    return {
      timestamp: Date.now(),
      success: false as const,
      error: "Database error" as const,
    };
  }

  revalidatePath("/profile");
  return {
    timestamp: Date.now(),
    success: true as const,
  };
}

export async function followUser(currentState: Result | null, id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      timestamp: Date.now(),
      success: false as const,
      error: "You must be signed in to follow a user" as const,
    };
  }
  if (session.user.id === id) {
    return {
      timestamp: Date.now(),
      success: false as const,
      error: "You cannot follow yourself" as const,
    };
  }
  try {
    await db.insert(follows).values({
      followerId: session.user.id,
      followingId: id,
    });
  } catch (error) {
    return {
      timestamp: Date.now(),
      success: false as const,
      error: "Database error" as const,
    };
  }
  revalidatePath("/");
  return {
    timestamp: Date.now(),
    success: true as const,
  };
}

export async function unfollowUser(currentState: Result | null, id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      timestamp: Date.now(),
      success: false as const,
      error: "You must be signed in to unfollow a user" as const,
    };
  }
  if (session.user.id === id) {
    return {
      timestamp: Date.now(),
      success: false as const,
      error: "You cannot unfollow yourself" as const,
    };
  }
  try {
    await db
      .delete(follows)
      .where(
        and(
          eq(follows.followerId, session.user.id),
          eq(follows.followingId, id)
        )
      );
  } catch (error) {
    return {
      timestamp: Date.now(),
      success: false as const,
      error: "Database error" as const,
    };
  }
  revalidatePath("/");
  return {
    timestamp: Date.now(),
    success: true as const,
  };
}
