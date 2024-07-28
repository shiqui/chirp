import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const session = await auth();
  if (!session) {
    return <div>Sign in to see profile</div>;
  }
  const user = session.user;
  return (
    <div>
      {/* {JSON.stringify(session)}{" "} */}
      <div className="flex flex-row gap-3 z-10">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user?.image ?? ""} />
          <AvatarFallback>{user?.name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-xl">
            {`@${user?.name}`} <Button variant="link">edit username</Button>{" "}
          </span>
          <span className="text-muted-foreground">{user?.id}</span>
          <span>{user?.email}</span>
        </div>
      </div>
    </div>
  );
}
