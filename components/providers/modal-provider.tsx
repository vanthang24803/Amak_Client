"use client";

import useAuth from "@/hooks/use-auth";
import useClient from "@/hooks/use-client";
import { profile } from "console";
import { useEffect } from "react";

export const ModalProvider = () => {
  const { isClient } = useClient();

  const { isLogin, getProfile, getNotification } = useAuth();

  useEffect(() => {
    if (isLogin) {
      getProfile();
      getNotification();
    }
  }, [getNotification, getProfile, isLogin]);

  if (!isClient) return null;

  return <></>;
};
