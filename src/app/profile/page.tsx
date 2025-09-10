import { PostCard } from "@/components/feed/post-card";
import { ProfileCard } from "@/components/profile/profile-card";
import { getPostsByAuthorId } from "@/db/queries/post";
import {
  getFollowerCountByUserId,
  getFollowingCountByUserId,
} from "@/db/queries/user";
import { auth } from "@/lib/auth";
import { StickyNoteIcon } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return <p className="p-6">Sign in to see your profile</p>;
  }
  const posts = await getPostsByAuthorId(session.user.id);
  const [followerCount, followingCount] = await Promise.all([
    getFollowerCountByUserId(session.user.id),
    getFollowingCountByUserId(session.user.id),
  ]);

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      <div className="sticky top-0 py-6 w-full z-10 bg-gradient-to-b from-background from-90% to-transparent">
        <ProfileCard
          session={session}
          followerCount={followerCount}
          followingCount={followingCount}
        />
        <h2 className="text-xl mt-4 flex items-center gap-2">
          Recent Posts
          <StickyNoteIcon />
        </h2>
      </div>

      <div className="w-full flex flex-col p-2 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
