"use client";

import { Spinner } from "@/components/spinner";
import useClient from "@/hooks/use-client";
import { PropsWithChildren } from "react";

export const Modal = ({ children }: PropsWithChildren) => {
  const { isClient } = useClient();

  return (
    <div className="flex flex-col space-y-4 w-full bg-white p-4 rounded-md">
      {isClient ? (
        <>{children}</>
      ) : (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Spinner />
        </div>
      )}
    </div>
  );
};
