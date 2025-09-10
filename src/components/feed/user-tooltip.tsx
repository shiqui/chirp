import {
  getFollowersCountByUserId,
  getFollowingCountByUserId,
  isFollowing,
} from "@/db/queries/user";
import { PostWithAuthor } from "@/db/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { auth } from "@/lib/auth";
import { FollowButton, UnfollowButton } from "./follow-button";

export async function UserTooltip({
  author,
}: {
  author: PostWithAuthor["author"];
}) {
  const session = await auth();
  const userId = session?.user?.id;

  const [followersCount, followingCount] = await Promise.all([
    getFollowersCountByUserId(author.id),
    getFollowingCountByUserId(author.id),
  ]);
  const following = userId ? await isFollowing(userId, author.id) : false;

  return (
    <div className="p-4 w-64 flex flex-col gap-2">
      <div className="flex justify-between">
        <Avatar className="w-16 h-16">
          <AvatarImage src={author.image ?? ""} />
          <AvatarFallback className="border border-accent-foregroud">
            {author.name ?? ""}
          </AvatarFallback>
        </Avatar>
        {userId &&
          userId !== author.id &&
          (following ? (
            <UnfollowButton authorId={author.id} />
          ) : (
            <FollowButton authorId={author.id} />
          ))}
      </div>

      <p className="text-lg">{author.name}</p>

      <div className="flex gap-2">
        <p className="">{followersCount} followers</p>
        <p>{followingCount} following</p>
      </div>
    </div>
  );
}
