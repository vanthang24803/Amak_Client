"use client"

import useClient from "@/hooks/use-client";
import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {

  const {isClient} = useClient();

  if(!isClient) return null;

  return <Toaster />;
};
