"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { updateUserProfile } from "@/db/actions/user";
import { AlertCircleIcon, LoaderCircle, Settings } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export function EditProfileDialog() {
  const [updateProfileState, action, pending] = useActionState(
    updateUserProfile,
    null
  );
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (updateProfileState?.success) {
      toast("Profile updated.", { description: new Date().toDateString() });
      setUsername("");
      setOpen(false);
    }
  }, [updateProfileState]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form action={action} className="flex flex-col gap-4">
          <Input
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {updateProfileState?.error && (
            <ServerAlertCard warning={updateProfileState.error} />
          )}
          <Button type="submit" disabled={pending || !username.trim()}>
            {pending ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ServerAlertCard({ warning }: { warning: string }) {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Unable to update the profile.</AlertTitle>
      <AlertDescription className="text-sm">{warning}</AlertDescription>
    </Alert>
  );
}
