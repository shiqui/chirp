import Link from "next/link";
import dayjs from "dayjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <div className="flex gap-3 rounded-2xl border border-slate-400 p-4">
      <Avatar>
        <AvatarImage src={post.user.image ?? ""} />
        <AvatarFallback>{post.user.name}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
          <Link href={`/`}>
            <span>{`@${post.user.name} `}</span>
          </Link>
          <Link href={`/post/`}>
            <span className="font-thin">{` · ${dayjs(
              post.createdAt,
            ).fromNow()}`}</span>
          </Link>
        </div>
        <span className="text-2xl text-slate-100">{post.content}</span>
      </div>
    </div>
  );
};
