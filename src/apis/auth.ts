import { endpoints } from '@/constants';
import type { LoginRequest, LoginResponse } from '@/schemas';
import { http } from '@/services';

export function login(body: LoginRequest) {
  return http<LoginResponse>(endpoints.login, {
    method: 'POST',
    body,
  });
}