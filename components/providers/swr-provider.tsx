"use client";

import fetcher from "@/services/fetcher";
import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

export default function SWRProvider({ children }: PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
}
