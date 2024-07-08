"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { createPost } from "@/db/actions/posts";

export default function CreatePostForm() {
  const { data: session } = useSession();
  const user = session?.user;

  const [content, setContent] = useState("");

  if (!user) {
    return <span className="text-primary-foreground">Sign in to post</span>;
  }

  return (
    <div className="flex flex-row gap-3">
      <Avatar>
        <AvatarImage src={user.image ?? ""} />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>
      <Input
        placeholder="What's on your mind?"
        className="grow bg-transparent text-primary-foreground outline-none"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        variant="ghost"
        className="text-primary-foreground"
        onClick={async () => {
          if (content.trim() === "") return;
          await createPost(content);
          setContent("");
        }}
      >
        Post
      </Button>
      <div className="flex justify-end"></div>
    </div>
  );
}
