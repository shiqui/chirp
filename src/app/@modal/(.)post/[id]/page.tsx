import React from "react";
import { Modal } from "@/components/feed/modal";
import { getPostById } from "@/db/queries/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(Number(id));

  if (!post) {
    return (
      <div className="pt-6 flex items-center gap-2">
        <span className="text-3xl">🤖</span>
        <span className="italic">ERR-UHHH...</span>
        <span className="text-3xl">😭</span>
        <span className="italic">
          I could not find this post for you... sorry!
        </span>
      </div>
    );
  }

  return (
    <Modal>
      <div className="w-full p-6 flex flex-row gap-4">
        <Avatar>
          {post.author.image && <AvatarImage src={post.author.image} />}
          <AvatarFallback className="border border-accent-foregroud">
            {post.author.name ?? ""}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2 w-full grow">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-foreground">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">
              {post.createdAt.toISOString().slice(0, 10)}
            </p>
          </div>
          <p className="whitespace-pre-wrap break-all">{post.content}</p>
        </div>
      </div>
    </Modal>
  );
}
