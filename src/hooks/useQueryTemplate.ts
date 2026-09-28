import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';

type QueryTemplateOptions<TQueryFnData, TError, TData> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, QueryKey>,
  'queryKey' | 'queryFn'
> & {
  queryKey: QueryKey;
  queryFn: () => Promise<TQueryFnData> | TQueryFnData;
};

// Empty wrapper now, could be use to add more functionality later, like logging, etc.
export function useQueryTemplate<
  TQueryFnData,
  TError = Error,
  TData = TQueryFnData,
>({
  queryKey,
  queryFn,
  ...options
}: QueryTemplateOptions<TQueryFnData, TError, TData>) {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
}

export type { UseQueryResult };