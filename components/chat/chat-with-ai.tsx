"use client";

import useSWR from "swr";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ElementRef, Fragment, useEffect, useRef, useState } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ChatWithAIInput } from "./chat-ai-input";
import { GeminiChatResponse } from "@/types/gemini-chat";
import { Avatar, AvatarImage } from "../ui/avatar";

export const ChatWithAI = () => {
  const { data: initialMessages } =
    useSWR<GeminiChatResponse[]>(`/Gemini/Chat`);
  const [messages, setMessages] = useState<GeminiChatResponse[]>([]);

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
    scrollToBottom();
    if (initialMessages) {
      setMessages(initialMessages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, initialMessages]);

  const addMessage = (newMessages: GeminiChatResponse[]) => {
    setMessages((prevMessages) => [...prevMessages, ...newMessages]);
  };

  return (
    <div className="h-[60vh] w-full relative overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={15}></ResizablePanel>
        <ResizableHandle disabled />
        <ResizablePanel defaultSize={85}>
          <ScrollArea
            className="relative h-[50vh] overflow-y-auto z-10"
            ref={chatRef}
            scrollHideDelay={150}
            type="scroll"
            onScroll={handleScroll}
          >
            <div className="px-4">
              {messages && messages.length > 0 && (
                <Fragment>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`relative flex space-x-2 mb-4 group ${!message.isBotReply ? "justify-end" : "justify-start"}`}
                    >
                      {message.isBotReply && (
                        <Avatar>
                          <AvatarImage src="https://salt.tikicdn.com/ts/ta/7f/77/cf/a2b2c31ea7b0ad4b2e7d0e6ef817241b.png" />
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg text-[12px] flex items-center justify-center p-2 max-w-[300px] z-10 ${
                          message.isBotReply
                            ? "bg-sky-500/90 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        {message.message}
                      </div>
                    </div>
                  ))}
                </Fragment>
              )}
            </div>
            <div ref={bottomRef} />
          </ScrollArea>
          <ChatWithAIInput onNewMessage={addMessage} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
