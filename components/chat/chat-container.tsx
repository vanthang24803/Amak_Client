"use client";

import { useEffect, useState, useRef, ElementRef } from "react";
import { useSocket } from "../providers/socket-provider";
import { Avatar, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  channelId: string | null;
};

export const ChatContainer = ({ channelId }: Props) => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<any[]>([]);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const scrollToBottom = () => {
    if (isAtBottom && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (chatRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
    }
  };

  useEffect(() => {
    setMessages([]); // Clear messages when channelId changes

    socket.emit("channel-detail", { channelId });

    socket.on(`channel-${channelId}`, (messages: any[]) => {
      setMessages(messages); // Replace the entire message list with new data
    });

    return () => {
      socket.off(`channel-${channelId}`); // Clean up event listener when channelId changes or component unmounts
    };
  }, [socket, channelId]);

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <ScrollArea
      className="h-[60vh] overflow-y-auto"
      ref={chatRef}
      onScroll={handleScroll}
    >
      {messages.map((message, index) => (
        <div key={index} className="flex items-start space-x-2 mb-4">
          <Avatar>
            <AvatarImage src={message.avatar} />
          </Avatar>
          <div className="rounded-lg text-white text-[12px] flex items-center justify-center bg-sky-500 p-2 max-w-[300px]">
            {message.content}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </ScrollArea>
  );
};
