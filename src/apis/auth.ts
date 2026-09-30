import { endpoints } from '@/constants';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/schemas';
import { http } from '@/services';

export function login(body: LoginRequest) {
  return http<LoginResponse>(endpoints.login, {
    method: 'POST',
    body,
  });
}

export function register(body: RegisterRequest) {
  return http <RegisterResponse>(endpoints.register, {
    method: 'POST',
    body,
  });
}