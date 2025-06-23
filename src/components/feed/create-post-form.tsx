"use client";

import { Session } from "next-auth";
import { Card } from "../ui/card";
import { useActionState, useState } from "react";
import { createPost } from "@/db/actions/post";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function CreatePostForm({
  session,
}: {
  session: Session | null;
}) {
  const [state, action, pending] = useActionState(createPost, null);
  const [content, setContent] = useState("");

  if (!session) {
    return (
      <Card className="w-full max-w-2xl p-4">
        <p className="text-center text-muted-foreground">
          Sign in to share your thoughts!
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl p-4">
      <form
        action={action}
        onSubmit={() =>
          toast("Post created.", { description: new Date().toDateString() })
        }
        className="flex flex-col gap-4"
      >
        <Textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="field-sizing-content resize-none"
        />
        <Button type="submit" disabled={pending}>
          Post
        </Button>
      </form>
    </Card>
  );
}
