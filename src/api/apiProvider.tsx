import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import {
  onlineManager,
  Query,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { FC, PropsWithChildren, useEffect } from "react";
import { zustandStorage } from "./storageManager"; // Assuming this works for web as well

// Create a persister using zustand storage (or replace it with a localStorage-based persister if needed for web)
export const clientPersister = createSyncStoragePersister({
  storage: zustandStorage as Storage,
  throttleTime: 3000,
});

// Define the QueryClient with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      throwOnError: true,
    },
  },
  queryCache: new QueryCache({
    onError: (/* error, query */) => {
      // TODO: Handle errors globally here
    },
  }),
});

// Function to clear the query cache
export const clearQueryCache = () => {
  queryClient.clear();
};

// API Provider component for React Web
export const APIProvider: FC<PropsWithChildren> = ({ children }) => {
  // Set up network event listener for web
  useEffect(() => {
    const handleOnlineStatus = () => {
      const isOnline = navigator.onLine;
      onlineManager.setOnline(isOnline);

      if (isOnline) {
        // Invalidate queries and resume paused mutations when back online
        queryClient.invalidateQueries();
        queryClient.resumePausedMutations();
      }
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  // Filter to selectively persist queries with 'persist' in the query key and success status
  const persistFilter = (query: Query) => {
    const queryKey = query.queryKey[0];

    return queryKey === "persist" && query.state.status === "success";
  };

  return (
    <PersistQueryClientProvider
      persistOptions={{
        persister: clientPersister,
        dehydrateOptions: { shouldDehydrateQuery: persistFilter },
      }}
      client={queryClient}
    >
      {children}
    </PersistQueryClientProvider>
  );
};

export default APIProvider;
