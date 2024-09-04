"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { MessageSquareText } from "lucide-react";
import { ChatContainer } from "../chat/chat-container";
import { InputChat } from "../chat/input-chat";
import { useRouter, useSearchParams } from "next/navigation";
import { Channel } from "../chat/channel";
import { AdminChat } from "@/types/admin-chat";
import _http from "@/utils/http";
import { Response } from "@/types";
import { useSocket } from "../providers/socket-provider";
import useAuth from "@/hooks/use-auth";
import { DialogTitle } from "@radix-ui/react-dialog";

const font = Inter({ subsets: ["latin"], weight: "400" });

export const ChatWrapper = () => {
  const searchParams = useSearchParams();
  const channelId = searchParams.get("channelId");
  const router = useRouter();
  const [activeChannel, setActiveChannel] = useState<string | null>(channelId);
  const { connection, isConnected } = useSocket();
  const [data, setData] = useState<Response<AdminChat[]>>();

  const [open, setOpen] = useState(false);

  const { isLogin } = useAuth();

  const { profile } = useAuth();

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

  useEffect(() => {
    if (isConnected && isLogin) {
      const userId = profile?.id;

      if (userId) {
        connection
          .invoke("GetAccounts", userId)
          .catch((error: any) =>
            console.log("Error fetching accounts:", error)
          );

        connection.on(`Users-${userId}`, (data: any) => {
          setData(data);
        });

        return () => {
          connection.off(`Users-${userId}`);
        };
      }
    }
  }, [connection, isLogin, isConnected, profile?.id]);

  const channelActiveData = data?.result.filter(
    (x) => x.id === activeChannel
  )[0];

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
        <DialogTitle className="font-bold text-xl tracking-tighter">
          Tin nhắn
        </DialogTitle>
        <div className="max-h-[75vh] min-h-[50vh] hidden md:block">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={30}>
              {data && (
                <Channel
                  data={data.result}
                  handleChannelClick={handleChannelClick}
                  active={activeChannel}
                />
              )}
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={70}>
              <div className="h-[75vh] w-full relative overflow-hidden">
                {activeChannel ? (
                  <div className="mx-4">
                    <ChatContainer channel={channelActiveData} />
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
