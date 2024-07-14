"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

import { db } from "..";
import { posts } from "../schema";

export const createPost = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  if (!session?.user?.id) {
    throw new Error("No user ID in session");
  }

  const authorId = session.user.id;

  const content = formData.get("content")?.toString();
  if (!content) {
    throw new Error("Content is required");
  }
  await db.insert(posts).values({ authorId, content });
  revalidatePath("/");
};
