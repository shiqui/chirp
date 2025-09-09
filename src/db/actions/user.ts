"use server";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { users } from "../schema";
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
  try {
    await db
      .update(users)
      .set({ name: username, updatedAt: new Date() })
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
