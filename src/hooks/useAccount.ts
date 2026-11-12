import { AddAccountRequest, AddAccountResponse } from '@/schemas';
import { useMutationTemplate } from './useMutationTemplate';
import { useQueryTemplate } from './useQueryTemplate';
import { addAccount, getAccounts } from '@/apis';
import { ApiRequestError } from '@/services';
import { UseAddAccountOptions } from '@/schemas/account';
import { useQueryClient } from '@tanstack/react-query';

export function useAccount(enabled = true) {
  const accountKey = ['accounts'];

  const data = useQueryTemplate({
    queryKey: accountKey,
    queryFn: getAccounts,
    enabled,
  });

  return {
    isAccountPending: data.isPending,
    isAccountError: data.isError,
    accountError: data.error,
    accountData: data.data,
  };
}

export function useAddAccount({ onSuccess, onError }: UseAddAccountOptions) {
  const queryClient = useQueryClient();

  const mutation = useMutationTemplate<
    AddAccountResponse,
    ApiRequestError,
    AddAccountRequest
  >({
    mutationFn: addAccount,
    onSuccess: (data) => {
      onSuccess?.(data);
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  return {
    addAccount: mutation.mutate,
    isAddAccountPending: mutation.isPending,
    isAddAccountError: mutation.isError,
    addAccountData: mutation.data,
    addAccountError: mutation.error,
  };
}
