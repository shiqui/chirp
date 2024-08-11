"use server";

import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "..";
import { users } from "../schema";

export const updateUser = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    return "Unauthorized";
  }

  if (!session?.user?.id) {
    return "No user ID in session";
  }

  const userId = session.user.id;
  const name = formData.get("username")?.toString();
  if (!name) {
    return "New username is required";
  }

  if (name.length > 50) {
    return "New username is too long";
  }

  await db.update(users).set({ name: name }).where(eq(users.id, userId));

  revalidatePath("/me");
  revalidatePath("/");
  return null;
};
