import { queryDetails } from '@/constants';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: queryDetails.retry,
      staleTime: queryDetails.staleTime,
      refetchOnWindowFocus: queryDetails.refetchOnWindowFocus,
    },
  },
});
