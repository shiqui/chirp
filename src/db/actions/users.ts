"use server";

import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "..";
import { users } from "../schema";

export const updateUser = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  if (!session?.user?.id) {
    throw new Error("No user ID in session");
  }
  const userId = session.user.id;
  const name = formData.get("name")?.toString();
  if (!name) {
    return "Name is required";
  }
  if (name.length > 50) {
    return "Name is too long";
  }
  await db.update(users).set({ name: name }).where(eq(users.id, userId));
  revalidatePath("/me");
};
