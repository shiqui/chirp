"use client";

import { Session } from "next-auth";
import { Card } from "../ui/card";
import { useActionState, useEffect, useMemo, useState } from "react";
import { createPost } from "@/db/actions/post";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AlertCircleIcon, CircleAlert, LoaderCircle, Send } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function CreatePostForm({
  session,
}: {
  session: Session | null;
}) {
  const [createPostState, action, pending] = useActionState(createPost, null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (createPostState?.success) {
      toast("Post created.", {
        description: new Date(createPostState.timestamp).toDateString(),
      });
      setContent("");
    }
  }, [createPostState?.timestamp]);

  if (!session) {
    return (
      <Card className="w-full p-4">
        <p className="text-center text-muted-foreground">
          Sign in to share your thoughts!
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-full p-4">
      <form action={action} className="flex flex-col gap-4">
        <Textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? Emojis only!"
          className="field-sizing-content resize-none"
        />
        {createPostState?.error && (
          <ServerAlertCard warning={createPostState.error} />
        )}
        <Button type="submit" disabled={pending || !content.trim()}>
          {pending ? "" : "Post"}
          {pending ? <LoaderCircle className="animate-spin" /> : <Send />}
        </Button>
      </form>
    </Card>
  );
}

function ServerAlertCard({ warning }: { warning: string }) {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Unable to submit this post.</AlertTitle>
      <AlertDescription className="text-sm">{warning}</AlertDescription>
    </Alert>
  );
}
