"use client";

import useClient from "@/hooks/use-client";
import { Sidebar } from "./side-bar";
import { Container } from "./container";
import { Spinner } from "@/components/spinner";
import useAuth from "@/hooks/use-auth";
import { redirect } from "next/navigation";

export const Wrapper = () => {
  const { isClient } = useClient();

  const { isLogin } = useAuth();

  if (!isLogin) {
    redirect("/");
  }

  if (!isClient)
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Spinner />
      </div>
    );

  return (
    <div className="flex mt-14 bg-[#f2f3f5] md:p-8 p-4">
      <Sidebar />
      <Container />
    </div>
  );
};
