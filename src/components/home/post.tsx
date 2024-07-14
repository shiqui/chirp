import dayjs from "dayjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type PostProps = {
  id: number;
  content: string | null;
  authorId: string;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

export const Post = async ({ post }: { post: PostProps }) => {
  return (
    <div className="flex w-full flex-row gap-3 py-3">
      <Avatar>
        <AvatarImage src={post.user.image ?? ""} />
        <AvatarFallback>{post.user.name}</AvatarFallback>
      </Avatar>

      <div className="flex flex-grow flex-col">
        <div className="gap-1 text-primary-foreground">
          <span>{`@${post.user.name} `}</span>
          <span className="font-thin">{` · ${dayjs(
            post.createdAt,
          ).fromNow()}`}</span>
        </div>
        <Link
          href={`post/${post.id}`}
          className="rounded-sm hover:bg-slate-600"
        >
          <span className="w-full break-words text-2xl text-primary-foreground">
            {post.content}
          </span>
        </Link>
      </div>
    </div>
  );
};