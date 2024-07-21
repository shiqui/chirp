import { Post } from "@/components/home/post";
import { getPostFromAuthorId } from "@/db/queries/posts";
import { getUserById } from "@/db/queries/users";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);
  if (!user) {
    return;
  }
  const posts = await getPostFromAuthorId(params.id);
  return posts.map((post) => Post({ ...post, user: user }));
}
