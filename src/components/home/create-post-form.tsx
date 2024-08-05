"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { createPost } from "@/db/actions/posts";
import Picker from "@emoji-mart/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

import Spinner from "../ui/spinner";

export default function CreatePostForm() {
  const { data: session } = useSession();
  const user = session?.user;

  const [content, setContent] = useState("");

  if (!user) {
    return <span>Sign in to post</span>;
  }

  return (
    <div className="sticky top-0 flex flex-col gap-3 bg-background pt-4 z-20">
      <div className="flex flex-row gap-3">
        <Avatar>
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
        <form
          className="flex flex-col gap-3 w-full"
          action={createPost}
          onSubmit={() => {
            setContent("");
          }}
        >
          <div className="flex flex-row gap-3 w-full">
            <Input
              placeholder="What's on your mind? Emojis only!"
              className="grow bg-transparent outline-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              type="text"
              name="content"
              value={content}
              autoComplete="off"
              required={true}
              onChange={(e) => {
                const emojiRegex = /[\p{Emoji_Presentation}\u200d]+/gu;
                const input = e.target.value;
                const filteredInput = input.match(emojiRegex)?.join("") || "";
                setContent(filteredInput.slice(0, 140));
              }}
            />
            <PostButton />
          </div>
          <div>
            <EmojiButton
              onEmojiSelect={(emoji) => {
                if (content.length >= 140) return;
                setContent((prev) => prev + emoji.native);
              }}
            />
          </div>
        </form>
      </div>
      <Separator />
    </div>
  );
}

function EmojiButton({
  onEmojiSelect,
}: {
  onEmojiSelect: ((emoji: { native: string }) => void) | null;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="rounded-full">
          😄
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Picker onEmojiSelect={onEmojiSelect} />
      </PopoverContent>
    </Popover>
  );
}

function PostButton() {
  const { pending } = useFormStatus();
  return (
    <Button variant="ghost" className="w-20" type="submit" disabled={pending}>
      {pending ? <Spinner /> : "Post"}
    </Button>
  );
}
