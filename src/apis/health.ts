import type { HealthResponse } from '@/schemas';
import { http } from '@/services';
import { endpoints } from '@/constants';

export function getHealth() {
  return http<HealthResponse>(endpoints.health, {
    method: 'GET',
  });
}
