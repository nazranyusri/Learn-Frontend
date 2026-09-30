import { login, register } from '@/apis';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/schemas';
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

export function useRegister() {
  // Implement register logic here
  const mutation = useMutationTemplate<RegisterResponse, ApiRequestError, RegisterRequest>({
    mutationFn: register,
  });

  return {
    register: mutation.mutate,
    isRegisterPending: mutation.isPending,
    isRegisterError: mutation.isError,
    registerData: mutation.data,
    registerError: mutation.error,
  };
}
