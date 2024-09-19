"use client";

import useClient from "@/hooks/use-client";
import { Toaster } from "react-hot-toast";
import { Toaster as Sonner } from "sonner";

export const ToasterProvider = () => {
  const { isClient } = useClient();

  if (!isClient) return null;

  return (
    <>
      <Toaster />
      <Sonner richColors />
    </>
  );
};
