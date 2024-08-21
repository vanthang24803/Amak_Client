"use client";

import useClient from "@/hooks/use-client";
import Image from "next/image";
import toast from "react-hot-toast";
import { useSocket } from "./socket-provider";
import useAuth from "@/hooks/use-auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Inter } from "next/font/google";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { MessageSquareText } from "lucide-react";
import { ChatContainer } from "../chat/chat-container";
import { InputChat } from "../chat/input-chat";

const font = Inter({ subsets: ["latin"], weight: "400" });
export const ChatProvider = () => {
  const { isClient } = useClient();
  const [active, setActive] = useState(false);
  const { socket } = useSocket();

  const { profile } = useAuth();
  if (!isClient) return null;

  return (
    <div className="fixed bottom-10 right-10">
      <Dialog>
        <DialogTrigger>
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white hover:cursor-pointer">
            <Image alt="message" width={20} height={20} src="./message.svg" />
          </div>
        </DialogTrigger>
        <DialogContent
          className={`${font.className} md:rounded-2xl  lg:max-w-4xl`}
        >
          <DialogHeader className="font-bold text-xl tracking-tighter">
            Tin nhắn
          </DialogHeader>
          <div className="max-h-[75vh] min-h-[50vh] hidden md:block">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={30}>
                <ScrollArea className="h-[75vh]">
                  <div
                    className="flex flex-col space-y-4 hover:cursor-pointer"
                    onClick={() => setActive(true)}
                  >
                    <div
                      className={`flex items-center space-x-3 px-4 py-2 mr-2 ${active && "rounded-md bg-neutral-100/90"}`}
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/ai.png" />
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="font-medium text-sm">Trợ lý AI</p>
                        <span className="text-[11px] italic w-[100px] whitespace-nowrap overflow-hidden text-ellipsis">
                          Something...
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={70}>
                <ScrollArea className="h-[75vh] w-full">
                  {active ? (
                    <div className="mx-4">
                      <ChatContainer />
                      <InputChat />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-neutral-400/90 h-[60vh] flex-col space-y-4">
                      <MessageSquareText className="w-24 h-24 " />
                      <h2>Vui lòng chọn đoạn chat!</h2>
                    </div>
                  )}
                </ScrollArea>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
