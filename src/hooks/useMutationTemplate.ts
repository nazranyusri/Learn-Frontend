import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query';

type MutationTemplateOptions<TData, TError, TVariables, TContext> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'mutationFn'
> & {
  mutationFn: (variables: TVariables) => Promise<TData>;
};

export function useMutationTemplate<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>({ mutationFn, ...options }: MutationTemplateOptions<TData, TError, TVariables, TContext>) {
  return useMutation({
    mutationFn,
    ...options,
  });
}

export type { UseMutationResult };