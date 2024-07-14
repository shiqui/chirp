import dayjs from "dayjs";
import { getPostFromId } from "@/db/queries/posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPostFromId(parseInt(params.id));
  if (!post) {
    return (
      <div className="flex w-full flex-col items-center gap-3 text-primary-foreground">
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
        <div className="gap-1 text-primary-foreground">
          <span>{`@${post.user.name} `}</span>
          <span className="font-thin">{` · ${dayjs(
            post.createdAt,
          ).fromNow()}`}</span>
        </div>
        <span className="flex-grow break-words text-2xl text-primary-foreground">
          {post.content}
        </span>
      </div>
    </div>
  );
}
