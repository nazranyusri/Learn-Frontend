import { noAuthorizationRequired } from '@/constants';
import type { ApiErrorResponse } from '@/schemas';
import { useAuthStore } from '@/stores';
import { ApiRequestError } from './apiError';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error('EXPO_PUBLIC_API_URL is not configured');
}

interface RequestOptions {
  method: string;
  params?: Record<string, string>;
  body?: Record<string, unknown>;
  headers?: HeadersInit;
}

function createRequestHeaders(
  options: RequestOptions,
  requiresAuth: boolean,
  accessToken: string | null,
) {
  const headers = new Headers(options.headers);

  if (options.body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (requiresAuth && accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  } else {
    headers.delete('Authorization');
  }

  return headers;
}

export async function http<T>(
  path: string,
  options: RequestOptions,
): Promise<T> {
  const accessToken = useAuthStore.getState().accessToken;
  const requiresAuth = !noAuthorizationRequired.some(
    (endpoint) => endpoint === path,
  );
  const headers = createRequestHeaders(options, requiresAuth, accessToken);
  const url = new URL(`${API_BASE_URL}${path}`);

  Object.entries(options.params ?? {}).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url, {
    method: options.method ?? 'GET',
    headers,
    body:
      options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  if (response.status === 401) {
    useAuthStore.getState().logout();
  }

  if (!response.ok) {
    let errorResponse: ApiErrorResponse | null = null;

    try {
      errorResponse = (await response.json()) as ApiErrorResponse;
    } catch {
      // Use the HTTP fallback when the response is not valid JSON.
    }

    throw new ApiRequestError(
      errorResponse?.error ?? {
        code: 'HTTP_ERROR',
        title: 'HTTP Error',
        message: `API request failed with status ${response.status}`,
        requestId: '',
      },
    );
  }

  return response.json() as Promise<T>;
}
