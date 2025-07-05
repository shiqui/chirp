import { getPostById } from "@/db/queries/post";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(Number(id));

  return post ? <p>{post.content}</p> : <p>404</p>;
}
