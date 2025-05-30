import { STALE_TIME } from "@Constants/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const defaultOptions = {
  getNextPageParam: (lastPage: any) => {
    if (lastPage?.metadata.hasNextPage) {
      return lastPage?.metadata.currentPage + 1;
    }
  },
  initialPageParam: 1,
};
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "online",
      staleTime: STALE_TIME,
      retry: (failCount, error: any) => error.cause == 401 && failCount < 1,
    },
    mutations: {
      networkMode: "online",
      retry: (failCount, error: any) => error.cause == 401 && failCount < 1,
    },
  },
});

export default function ApiClientProvider(props: React.PropsWithChildren) {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
