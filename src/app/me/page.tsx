import { auth } from "@/auth";
import EditUserPopover from "@/components/home/edit-user-popover";
import { Post } from "@/components/home/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getPostFromAuthorId } from "@/db/queries/posts";

export default async function Page() {
  const session = await auth();
  if (!session) {
    return <div>Sign in to see profile</div>;
  }
  const user = session.user;

  const posts = await getPostFromAuthorId(user?.id ?? "");

  return (
    <div className="gap-8 flex flex-col">
      <div className="flex flex-row gap-3 z-10">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user?.image ?? ""} />
          <AvatarFallback>{user?.name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-xl">
            {`@${user?.name}`}
            <EditUserPopover />
          </span>
          <span className="text-muted-foreground">{user?.id}</span>
          <span>{user?.email}</span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
