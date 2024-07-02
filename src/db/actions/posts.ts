"use server";
import { db } from "..";
import { posts } from "../schema";
import { revalidatePath } from "next/cache";

export const createPost = async (authorId: string, content: string) => {
  await db.insert(posts).values({ authorId, content });
  revalidatePath("/");
};
