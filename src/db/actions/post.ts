"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

import { db } from "..";
import { posts } from "../schema";

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

export const createPost = async (
  currentState: Result | null,
  formData: FormData
) => {
  const session = await auth();
  if (!session) {
    return {
      timestamp: Date.now(),
      success: false as const,
      error: "You must be signed in to create a post" as const,
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

  const content = formData.get("content")?.toString();
  if (!content) {
    return {
      timestamp: Date.now(),
      success: false as const,
      error: "Content is empty" as const,
    };
  }

  if (content.length > 255) {
    return {
      timestamp: Date.now(),
      success: false as const,
      error: "Content is too long" as const,
    };
  }

  const newlineCount = (content.match(/\n/g) || []).length;
  if (newlineCount > 20) {
    return {
      timestamp: Date.now(),
      success: false as const,
      error: "Content contains too many newlines" as const,
    };
  }

  const emojiOnlyRegex =
    /^(?:\p{Emoji}(?:\p{Emoji_Modifier}|\uFE0F)?(?:\u200D\p{Emoji})*|\s|\n|\r)+$/gu;
  if (!emojiOnlyRegex.test(content)) {
    return {
      timestamp: Date.now(),
      success: false as const,
      error: "Only emojis, spaces, and newlines are allowed" as const,
    };
  }

  try {
    await db.insert(posts).values({ authorId, content });
  } catch (error) {
    console.error(error);
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
};
