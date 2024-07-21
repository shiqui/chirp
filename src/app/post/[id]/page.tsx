import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getPostFromId } from "@/db/queries/posts";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPostFromId(parseInt(params.id));
  if (!post) {
    return (
      <div className="flex w-full flex-col items-center gap-3">
        <span>No post found</span>
        <Link href="/">
          <Button variant="ghost">Go back</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex w-full flex-row gap-3">
      <Avatar>
        <AvatarImage src={post.user.image ?? ""} />
        <AvatarFallback>{post.user.name}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="gap-1">
          <span>{`@${post.user.name} `}</span>
          <span className="font-thin">{` · ${dayjs(
            post.createdAt,
          ).fromNow()}`}</span>
        </div>
        <span className="flex-grow break-words text-2xl">{post.content}</span>
      </div>
    </div>
  );
}
