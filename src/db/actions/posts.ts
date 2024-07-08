"use server";
import { auth } from "@/auth";
import { db } from "..";
import { posts } from "../schema";
import { revalidatePath } from "next/cache";

export const createPost = async (content: string) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  if (!session?.user?.id) {
    throw new Error("No user ID in session");
  }
  const authorId = session.user.id;
  await db.insert(posts).values({ authorId, content });
  revalidatePath("/");
};
