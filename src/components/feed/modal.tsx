"use client";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Share } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={() => router.back()}>
      <DialogOverlay>
        <DialogContent className="overflow-y-hidden">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2">
                Share this post
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        navigator.clipboard.writeText(window.location.href)
                      }
                    >
                      <Share />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy link to clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
