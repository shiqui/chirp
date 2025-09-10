"use client";

import { startTransition, useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { followUser, unfollowUser } from "@/db/actions/user";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export function FollowButton({ authorId }: { authorId: string }) {
  const [followUserState, action, pending] = useActionState(followUser, null);

  useEffect(() => {
    console.log(followUserState);
    if (followUserState?.success) {
      toast.message("Followed successfully.", {
        description: new Date(followUserState.timestamp).toDateString(),
      });
    } else if (followUserState?.error) {
      toast.error(followUserState.error, {
        description: new Date(followUserState.timestamp).toDateString(),
      });
    }
  }, [followUserState?.timestamp]);

  return (
    <Button
      variant="secondary"
      onClick={() => startTransition(() => action(authorId))}
      disabled={pending}
    >
      {pending ? <LoaderCircle className="animate-spin" /> : "Follow"}
    </Button>
  );
}

export function UnfollowButton({ authorId }: { authorId: string }) {
  const [unfollowUserState, action, pending] = useActionState(
    unfollowUser,
    null
  );

  useEffect(() => {
    if (unfollowUserState?.success) {
      toast.message("Unfollowed successfully.", {
        description: new Date(unfollowUserState.timestamp).toDateString(),
      });
    } else if (unfollowUserState?.error) {
      toast.error(unfollowUserState.error, {
        description: new Date(unfollowUserState.timestamp).toDateString(),
      });
    }
  }, [unfollowUserState?.timestamp]);

  return (
    <Button
      variant="outline"
      onClick={() => startTransition(() => action(authorId))}
      disabled={pending}
    >
      {pending ? <LoaderCircle className="animate-spin" /> : "Unfollow"}
    </Button>
  );
}
