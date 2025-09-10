import { PostWithAuthor } from "@/db/types";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { UserTooltip } from "./user-tooltip";
dayjs.extend(relativeTime);

export function PostCard({
  post,
  popup = true,
}: {
  post: PostWithAuthor;
  popup?: boolean;
}) {
  return (
    <Card className="w-full p-6 flex flex-row gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar>
            {post.author.image && <AvatarImage src={post.author.image} />}
            <AvatarFallback className="border border-accent-foregroud">
              {post.author.name ?? ""}
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <UserTooltip author={post.author} />
        </TooltipContent>
      </Tooltip>

      <div className="flex flex-col gap-2 w-full grow">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-foreground">{post.author.name}</p>
          <p className="text-sm text-muted-foreground">
            {dayjs(post.createdAt).fromNow()}
          </p>
        </div>

        {popup ? (
          <Link href={`post/${post.id}`}>
            <p className="whitespace-pre-wrap break-all">{post.content}</p>
          </Link>
        ) : (
          <p className="whitespace-pre-wrap break-all">{post.content}</p>
        )}
      </div>
    </Card>
  );
}
