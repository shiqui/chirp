import { Session } from "next-auth";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function ProfileCard({ session }: { session: Session }) {
  return (
    <Card className="w-full flex flex-row gap-4 p-6">
      <Avatar className="w-24 h-24">
        <AvatarImage src={session?.user?.image ?? ""} />
        <AvatarFallback className="border border-accent-foregroud" delayMs={10}>
          {session?.user?.name ?? ""}
        </AvatarFallback>
      </Avatar>
      <h2 className="text-xl font-semibold">
        {session ? `${session.user?.name}` : "Guest"}
      </h2>
      <p className="text-gray-600">
        {session ? session.user?.email : "No email available"}
      </p>
    </Card>
  );
}
