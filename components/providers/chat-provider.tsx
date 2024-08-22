"use client";

import useClient from "@/hooks/use-client";
import { Suspense } from "react";
import { ChatWrapper } from "../chat/chat-wrapper";

export const ChatProvider = () => {
  const { isClient } = useClient();
  if (!isClient) return null;

  return (
    <div>
      <div className="fixed bottom-10 right-10">
        <Suspense fallback={null}>
          <ChatWrapper />
        </Suspense>
      </div>
    </div>
  );
};
