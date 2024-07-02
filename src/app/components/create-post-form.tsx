"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { revalidatePath } from "next/cache";

type CreatePostFormProps = {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
  action: (authorId: string, content: string) => Promise<void>;
};

export default function CreatePostForm({ user, action }: CreatePostFormProps) {
  const [content, setContent] = useState("");

  if (!user) {
    return <div>Sign in to post</div>;
  }

  return (
    <div className="flex flex-row gap-3">
      <Avatar>
        <AvatarImage src={user.image ?? ""} />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>
      <Input
        placeholder="What's on your mind?"
        className="grow bg-transparent outline-none"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        variant="ghost"
        onClick={() => {
          if (content.trim() === "") return;
          action(user.id, content);
          setContent("");
        }}
      >
        Post
      </Button>
      <div className="flex justify-end"></div>
    </div>
  );
}
