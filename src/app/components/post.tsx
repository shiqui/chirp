import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

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
    <div className="flex gap-3 rounded-lg border border-slate-400 p-4">
      <Image
        src={post.user.image ?? "/default-profile.png"} // FIXME: need to have a default profile later
        className="h-14 w-14 rounded-full"
        alt={`@${post.user.name}'s profile picture`}
        width={56}
        height={56}
      />
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
          <Link href={`/`}>
            <span>{`@${post.user.name} `}</span>
          </Link>
          <Link href={`/post/`}>
            <span className="font-thin">{` · ${dayjs(
              post.createdAt
            ).fromNow()}`}</span>
          </Link>
        </div>
        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  );
};
