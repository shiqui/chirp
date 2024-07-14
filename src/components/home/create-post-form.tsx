"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { createPost } from "@/db/actions/posts";
import { useFormStatus } from "react-dom";
import Spinner from "../ui/spinner";

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
      <form
        className="flex grow flex-row gap-3"
        action={async () => {
          if (content.trim() === "") return;
          await createPost(content);
          setContent("");
        }}
      >
        <Input
          placeholder="What's on your mind?"
          className="grow bg-transparent text-primary-foreground outline-none"
          type="text"
          value={content}
          onChange={(e) => {
            console.log(e);
            setContent(e.target.value);
          }}
        />
        <PostButton />
      </form>
      <div className="flex justify-end"></div>
    </div>
  );
}

function PostButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="ghost"
      className="w-20 text-primary-foreground"
      type="submit"
      disabled={pending}
    >
      {pending ? <Spinner /> : "Post"}
    </Button>
  );
}
