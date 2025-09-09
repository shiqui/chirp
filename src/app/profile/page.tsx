import { ProfileCard } from "@/components/profile/profile-card";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="w-full flex flex-col items-center p-6">
      {session && <ProfileCard session={session} />}
    </div>
  );
}
