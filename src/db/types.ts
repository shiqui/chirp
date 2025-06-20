// TODO: couldn't find a way to infer types of related tables on query with Drizzle :(
// e.g. getAllPosts({with: { author: true }})
// Manually inferring them here.
import { getAllPosts } from "@/db/queries/post";

export type PostWithAuthor = Awaited<ReturnType<typeof getAllPosts>>[number];
