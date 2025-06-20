"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

import { db } from "..";
import { posts } from "../schema";

type Result =
  | {
      success: true;
    }
  | {
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
      success: false as const,
      error: "You must be signed in to create a post" as const,
    };
  }
  if (!session?.user?.id) {
    return {
      success: false as const,
      error: "Your session has no user ID" as const,
    };
  }

  const authorId = session.user.id;

  const content = formData.get("content")?.toString();
  if (!content) {
    return {
      success: false as const,
      error: "Content is empty" as const,
    };
  }
  await db.insert(posts).values({ authorId, content });
  revalidatePath("/");
  return {
    success: true as const,
  };
};
