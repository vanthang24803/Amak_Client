"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import _http from "@/utils/http";

import { DialogTitle } from "@radix-ui/react-dialog";
import MessageIcon from "../../public/message.svg";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChatRoot } from "./chat-root";
import { ChatWithAI } from "./chat-with-ai";

const font = Inter({ subsets: ["latin"], weight: "400" });

export const ChatWrapper = () => {
  const searchParams = useSearchParams();
  const channelId = searchParams.get("channelId");
  const router = useRouter();
  const [activeChannel, setActiveChannel] = useState<string | null>(channelId);
  const [open, setOpen] = useState(false);

  const [isChatWithAi, setIsChatWithAi] = useState(false);

  const handlerOpen = () => {
    if (open) {
      router.push(`?`);
      setActiveChannel(null);
    }
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={handlerOpen}>
      <DialogTrigger>
        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white hover:cursor-pointer">
          <Image alt="message" width={20} height={20} src={MessageIcon} />
        </div>
      </DialogTrigger>
      <DialogContent
        className={`${font.className} md:rounded-2xl lg:max-w-4xl`}
      >
        <DialogTitle className="flex items-center gap-4">
          <div>
            {isChatWithAi ? (
              <div className="flex items-center gap-3">
                <p className="font-bold text-xl tracking-tighter">
                  Trò chuyện với AI
                </p>
                <Image
                  src="https://salt.tikicdn.com/ts/ta/7f/77/cf/a2b2c31ea7b0ad4b2e7d0e6ef817241b.png"
                  width={40}
                  height={40}
                  alt="bot"
                />
              </div>
            ) : (
              <p className="font-bold text-xl tracking-tighter">Trò chuyện</p>
            )}
          </div>
        </DialogTitle>
        <div className="max-h-[75vh] min-h-[50vh] hidden md:block">
          <div className="relative">
            {isChatWithAi ? (
              <ChatWithAI />
            ) : (
              <ChatRoot
                channelId={channelId}
                activeChannel={activeChannel}
                setActiveChannel={setActiveChannel}
              />
            )}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`absolute left-0  rounded-md flex items-center justify-center cursor-pointer bottom-0`}
                    onClick={() => setIsChatWithAi(!isChatWithAi)}
                  >
                    {!isChatWithAi ? (
                      <Image
                        src="https://salt.tikicdn.com/ts/ta/7f/77/cf/a2b2c31ea7b0ad4b2e7d0e6ef817241b.png"
                        width={40}
                        height={40}
                        alt="bot"
                      />
                    ) : (
                      <div className="w-9 h-9 bg-sky-600 cursor-pointer rounded flex items-center justify-center">
                        <Image
                          src="https://salt.tikicdn.com/ts/ta/e1/5e/b4/2e33d86e11e2841a6a571de6084ff365.png"
                          width={25}
                          height={25}
                          alt="bot"
                        />
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-[13px] tracking-tight">
                    {!isChatWithAi
                      ? " Trò chuyện với AI"
                      : "Chăm sóc khách hàng"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
