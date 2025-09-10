import React from "react";
import { Modal } from "@/components/feed/modal";
import { getPostById } from "@/db/queries/post";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(Number(id));

  return (
    <Modal>
      <p className="whitespace-pre-wrap break-all">{post?.content}</p>
    </Modal>
  );
}
