import { PostWithAuthor } from "@/db/types";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
dayjs.extend(relativeTime);

export function PostCard({ post }: { post: PostWithAuthor }) {
  return (
    <Link href={`post/${post.id}`}>
      <Card className="w-full max-w-2xl p-6 flex flex-row gap-4">
        <Avatar>
          <AvatarImage src={post.author.image ?? ""} />
          <AvatarFallback className="border border-accent-foregroud">
            {post.author.name ?? ""}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-foreground">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">
              {dayjs(post.createdAt).fromNow()}
            </p>
          </div>
          <p>{post.content}</p>
        </div>
      </Card>
    </Link>
  );
}
