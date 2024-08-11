import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

export function Post({
  id,
  content,
  createdAt,
  user,
}: {
  id: number;
  content: string | null;
  authorId: string;
  createdAt: Date;
  user: {
    id: string;
    name?: string | null;
    image?: string | null;
  };
}) {
  return (
    <div className="flex w-full flex-row gap-3 py-3">
      <Avatar>
        <AvatarImage src={user.image ?? ""} />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>

      <div className="flex flex-grow flex-col">
        <div className="gap-1">
          <span>{`@${user.name} `}</span>
          <span className="font-thin">{` · ${dayjs(
            createdAt,
          ).fromNow()}`}</span>
        </div>
        <Link href={`/post/${id}`} className="rounded-sm hover:bg-muted">
          <span className="w-full break-words text-2xl">{content}</span>
        </Link>
      </div>
    </div>
  );
}
