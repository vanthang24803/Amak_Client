"use client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Inter } from "next/font/google";
import { useState } from "react";
import { MessageSquareText } from "lucide-react";
import { ChatContainer } from "../chat/chat-container";
import { InputChat } from "../chat/input-chat";
import { useRouter, useSearchParams } from "next/navigation";
import { Channel } from "../chat/channel";

const font = Inter({ subsets: ["latin"], weight: "400" });

export const ChatWrapper = () => {
  const searchParams = useSearchParams();
  const channelId = searchParams.get("channelId");
  const router = useRouter();
  const [activeChannel, setActiveChannel] = useState<string | null>(channelId);
  const [open, setOpen] = useState(false);

  const handleChannelClick = (channelId: string) => {
    setActiveChannel(channelId);
    router.push(`?channelId=${channelId}`);
  };

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
          <Image alt="message" width={20} height={20} src="./message.svg" />
        </div>
      </DialogTrigger>
      <DialogContent
        className={`${font.className} md:rounded-2xl lg:max-w-4xl`}
      >
        <DialogHeader className="font-bold text-xl tracking-tighter">
          Tin nhắn
        </DialogHeader>
        <div className="max-h-[75vh] min-h-[50vh] hidden md:block">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={30}>
              <Channel
                handleChannelClick={handleChannelClick}
                active={activeChannel}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={70}>
              <div className="h-[75vh] w-full relative overflow-hidden">
                {activeChannel ? (
                  <div className="mx-4">
                    <ChatContainer channelId={channelId} />
                    <InputChat channelId={channelId} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-neutral-400/90 h-[60vh] flex-col space-y-4">
                    <MessageSquareText className="w-24 h-24 " />
                    <h2>Vui lòng chọn đoạn chat!</h2>
                  </div>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
};
