import { Telescope } from "lucide-react";
import { Separator } from "../ui/separator";

export default function Explore() {
  return (
    <div className="sticky top-20">
      <h1 className="text-xl mb-4 flex items-center gap-2">
        Explore
        <Telescope />
      </h1>

      <Separator />

      <div className="grow flex flex-col items-start p-4 gap-2">
        <p>🚧</p>
      </div>
    </div>
  );
}
