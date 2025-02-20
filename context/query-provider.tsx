"use client";

import { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


interface Props {
    children: ReactNode;
}


export const QueryProvider = ({ children }: Props) => {


    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: (failureCount, error) => {
                    if (failureCount < 2 && error?.message === "NetworkError: Failed to fetch") {
                        return true;
                    }
                    return false;
                },
                retryDelay: 0,
                staleTime: 1000 * 60 * 60 * 24, // 24 hours
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}



