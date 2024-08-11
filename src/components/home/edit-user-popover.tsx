"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { updateUser } from "@/db/actions/users";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function EditUserPopover() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [content, setContent] = useState("");

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="link">edit username</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form
          action={updateUser}
          className="p-3 gap-4 bg-muted rounded-lg flex"
          onSubmit={(e) => {
            setPopoverOpen(false);
          }}
        >
          <Input
            type="text"
            name="username"
            placeholder="New username"
            autoComplete="off"
            className="w-full"
            required={true}
            spellCheck={false}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
          />
          <SaveButton />
        </form>
      </PopoverContent>
    </Popover>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Save
    </Button>
  );
}
