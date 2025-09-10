import { Flame } from "lucide-react";
import { Separator } from "../ui/separator";
import { getEmojisOfTheDay } from "@/db/queries/post";

export default async function TopEmoji() {
  const emojis = await getEmojisOfTheDay();

  return (
    <div className="sticky top-20">
      <h1 className="text-xl mb-4 flex items-center gap-2">
        Emoji of the Day
        <Flame />
      </h1>

      <Separator />

      <div className="grow flex flex-col items-start p-4 gap-2">
        {emojis.length > 0 ? (
          emojis.map(([emoji, count]) => (
            <div className="flex items-center gap-4" key={emoji}>
              <span className="text-3xl">{emoji}</span>
              <span className="text-xl">{count}</span>
            </div>
          ))
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-3xl">🤖</span>
            <span className="italic">Not enough data...</span>
          </div>
        )}
      </div>
    </div>
  );
}
