import { UserBadge } from "./user-badge";

export default async function SideNav() {
  return (
    <div className="fixed left-0 top-0 w-screen">
      <nav className="flex w-1/3 flex-col gap-4 p-4">
        <div className="grow"></div>
        <UserBadge />
      </nav>
    </div>
  );
}
