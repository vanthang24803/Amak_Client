"use client";

import useAuth from "@/hooks/use-auth";
import { useCartV2 } from "@/hooks/use-cart.v2";
import useClient from "@/hooks/use-client";
import { useEffect } from "react";

export const ModalProvider = () => {
  const { isClient } = useClient();

  const { isLogin, getProfile, getNotification } = useAuth();

  const { getCarts } = useCartV2();

  useEffect(() => {
    if (isLogin) {
      getProfile();
      getNotification();
      getCarts();
    }
  }, [getCarts, getNotification, getProfile, isLogin]);

  if (!isClient) return null;

  return <></>;
};
