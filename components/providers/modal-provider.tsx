"use client";

import useClient from "@/hooks/use-client";

export const ModalProvider = () => {
  const { isClient } = useClient();

  if (!isClient) return null;

  return <></>;
};
