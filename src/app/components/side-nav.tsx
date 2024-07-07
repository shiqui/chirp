import { UserBadge } from "./user-badge";

export default async function SideNav() {
  return (
    <nav className="flex w-1/3 flex-col gap-4 p-4">
      <div className="grow"></div>
      <UserBadge />
    </nav>
  );
}
