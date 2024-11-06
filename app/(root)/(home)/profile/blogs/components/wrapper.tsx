"use client";

import { CalendarPlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Modal } from "../../_components/modal";
import { Render } from "./render";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

export const Wrapper = () => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col space-y-8">
      <div className="flex items-center justify-center flex-col  space-y-4 ">
        <h1 className="text-2xl  font-bold">Bài viết của bạn</h1>
        <Separator className="w-[100px] h-1 bg-black rounded" />
      </div>

      <Modal>
        <div className="flex items-center justify-between">
          <h2 className="uppercase font-bold tracking-tight">
            Danh sách các bài viết
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CalendarPlus
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => router.push(`/posts`)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm font-semibold tracking-tighter">
                  Tạo bài viết mới
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Separator />
        <Render />
      </Modal>
    </div>
  );
};
