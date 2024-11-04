"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MessageSquareText } from "lucide-react";
import { useRouter } from "next/navigation";
import { Channel } from "../chat/channel";
import { AdminChat } from "@/types/admin-chat";
import _http from "@/utils/http";
import { Response } from "@/types";
import { useSocket } from "../providers/socket-provider";
import useAuth from "@/hooks/use-auth";
import { ChatContainer } from "./chat-container";
import { InputChat } from "./input-chat";

type Props = {
  activeChannel: string | null;
  channelId: string | null;
  setActiveChannel: Dispatch<SetStateAction<string | null>>;
};

export const ChatRoot = ({
  activeChannel,
  setActiveChannel,
  channelId,
}: Props) => {
  const router = useRouter();
  const { connection, isConnected } = useSocket();
  const [data, setData] = useState<Response<AdminChat[]>>();

  const { isLogin, profile } = useAuth();

  const handleChannelClick = (channelId: string) => {
    setActiveChannel(channelId);
    router.push(`?channelId=${channelId}`);
  };

  useEffect(() => {
    if (isConnected && isLogin) {
      const userId = profile?.id;

      if (userId) {
        connection
          .invoke("GetAccounts", userId)
          .catch((error: any) =>
            console.log("Error fetching accounts:", error),
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
    (x) => x.id === activeChannel,
  )[0];

  return (
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
  );
};
