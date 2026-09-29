import { login } from '@/apis';
import type { LoginRequest, LoginResponse } from '@/schemas';
import { ApiRequestError } from '@/services';
import { useAuthStore } from '@/stores';
import { useMutationTemplate } from './useMutationTemplate';

export function useLogin() {
  const mutation = useMutationTemplate<
    LoginResponse,
    ApiRequestError,
    LoginRequest
  >({
    mutationFn: login,
    onSuccess: (data) => {
      useAuthStore.getState().setAccessToken(data.accessToken);
    },
  });


  return {
    login: mutation.mutate,
    isLoginPending: mutation.isPending,
    isLoginError: mutation.isError,
    loginData: mutation.data,
    loginError: mutation.error,
  };
}
