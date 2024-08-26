"use client";

import useClient from "@/hooks/use-client";
import { Suspense } from "react";
import { ChatWrapper } from "../chat/chat-wrapper";
import useAuth from "@/hooks/use-auth";

export const ChatProvider = () => {
  const { isClient } = useClient();

  const { isLogin } = useAuth();

  if (!isClient) return null;

  if (!isLogin) return null;

  return (
    <>
      <div className="fixed bottom-10 right-10 z-50">
        <Suspense fallback={null}>
          <ChatWrapper />
        </Suspense>
      </div>
    </>
  );
};
