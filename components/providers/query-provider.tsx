"use client";

import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import useClient from "@/hooks/use-client";

export const QueryProvider = ({ children }: PropsWithChildren) => {
  const { isClient } = useClient();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 5,
        retryDelay: 1000,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
      },
    },
  });

  if (!isClient) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};
