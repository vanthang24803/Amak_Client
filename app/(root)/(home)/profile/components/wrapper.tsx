"use client";

import useClient from "@/hooks/use-client";
import { Sidebar } from "./side-bar";
import { Container } from "./container";

export const Wrapper = () => {
  const { isClient } = useClient();

  if (!isClient) return null;

  return (
    <div className="flex mt-14 bg-[#f2f3f5] md:p-8 p-4">
      <Sidebar />
      <Container />
    </div>
  );
};
