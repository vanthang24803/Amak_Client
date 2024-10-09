"use client";

import useAuth from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import useClient from "@/hooks/use-client";
import { useEffect } from "react";

export const ModalProvider = () => {
  const { isClient } = useClient();

  const { isLogin, getProfile, getNotification } = useAuth();

  const { getCarts } = useCart();

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
