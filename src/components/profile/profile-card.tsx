import { Session } from "next-auth";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { EditProfileDialog } from "./edit-profile-dialog";

export function ProfileCard({ session }: { session: Session }) {
  return (
    <Card className="w-full flex flex-row gap-6 p-6">
      <Avatar className="w-24 h-24">
        <AvatarImage src={session?.user?.image ?? ""} />
        <AvatarFallback className="border border-accent-foregroud" delayMs={10}>
          {session?.user?.name ?? ""}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start grow">
        <h2 className="text-lg font-semibold">
          {session ? `${session.user?.name}` : "Guest"}
        </h2>
        <p className="text-muted-foreground">
          {session ? session.user?.email : "No email available"}
        </p>
        <p className="mt-4 break-all">{session?.user?.bio}</p>
      </div>
      <div>
        <EditProfileDialog />
      </div>
    </Card>
  );
}
