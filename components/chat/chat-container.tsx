"use client";

import { useEffect, useState, useRef, ElementRef } from "react";
import { useSocket } from "../providers/socket-provider";
import { ScrollArea } from "../ui/scroll-area";
import useAuth from "@/hooks/use-auth";
import { ChatAction } from "./chat-action";
import { Separator } from "../ui/separator";
import { AdminChat } from "@/types/admin-chat";
import { Avatar, AvatarImage } from "../ui/avatar";

type Props = {
  channel: AdminChat | undefined;
};

export const ChatContainer = ({ channel }: Props) => {
  const { connection } = useSocket();
  const [messages, setMessages] = useState<any[]>([]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const { profile } = useAuth();

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
    if (connection && channel?.id && profile?.id) {
      const handleReceiveMessage = (message: any) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      const handleMessages = (messages: any[]) => {
        setMessages(messages);
      };

      const handleMessageDeleted = (messageId: string) => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === messageId ? { ...msg, isDeleted: true } : msg
          )
        );
      };

      connection.on("ReceiveMessage", handleReceiveMessage);
      connection.on("Messages", handleMessages);
      connection.on("MessageDeleted", handleMessageDeleted);

      connection
        .invoke("JoinChat", profile.id, channel.id)
        .catch((error: any) => console.log("Error joining chat:", error));

      return () => {
        connection.off("ReceiveMessage", handleReceiveMessage);
        connection.off("Messages", handleMessages);
        connection.off("MessageDeleted", handleMessageDeleted);
      };
    }
  }, [connection, channel?.id, profile?.id]);

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <ScrollArea
      className="relative h-[60vh] overflow-y-auto z-10"
      ref={chatRef}
      scrollHideDelay={150}
      type="scroll"
      onScroll={handleScroll}
    >
      <div className="bg-white z-20 h-8 sticky -top-0.5 flex flex-col gap-2">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={channel?.avatar} />
          </Avatar>
          <h4 className="text-sm font-semibold tracking-tight scroll-m-20">
            {channel?.name}
          </h4>
        </div>
      </div>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`relative flex space-x-2 mb-4 group ${message.fromUserId === profile?.id ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`rounded-lg text-[12px] flex items-center justify-center p-2 max-w-[300px] ${message.isDeleted ? "italic text-muted bg-sky-500/90" : "text-white bg-sky-500"} z-10`}
          >
            {message.isDeleted ? "Tin nhắn này đã bị xóa" : message.content}
          </div>
          {message.fromUserId === profile?.id && !message.isDeleted && (
            <ChatAction id={message.id} />
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </ScrollArea>
  );
};
