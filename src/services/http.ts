import { noAuthorizationRequired } from '@/constants';
import type { ApiError, ApiSuccess } from '@/schemas';
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
  requestId?: string;
}

function isApiError(body: unknown): body is ApiError {
  if (typeof body !== 'object' || body === null) {
    return false;
  }

  const candidate = body as Partial<ApiError>;

  return (
    typeof candidate.status === 'number' &&
    typeof candidate.requestId === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.detail === 'string' &&
    typeof candidate.code === 'string' &&
    Array.isArray(candidate.errors)
  );
}

function isApiSuccess<T>(body: unknown): body is ApiSuccess<T> {
  if (typeof body !== 'object' || body === null) {
    return false;
  }

  const candidate = body as Partial<ApiSuccess<T>>;

  return (
    typeof candidate.status === 'number' &&
    typeof candidate.requestId === 'string' &&
    'data' in candidate
  );
}

function createFallbackError(status: number, detail: string): ApiError {
  return {
    status,
    requestId: '',
    title: 'Request Failed',
    detail,
    code: 'HTTP_ERROR',
    errors: [],
  };
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

  if (options.requestId) {
    headers.set('X-Request-Id', options.requestId);
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
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  let responseBody: unknown = null;

  try {
    responseBody = await response.json();
  } catch {
    responseBody = null;
  }

  if (!response.ok) {
    if (response.status === 401) {
      useAuthStore.getState().logout();
    }

    throw new ApiRequestError(
      isApiError(responseBody)
        ? responseBody
        : createFallbackError(
            response.status,
            `API request failed with status ${response.status}`,
          ),
    );
  }

  if (!isApiSuccess<T>(responseBody)) {
    throw new ApiRequestError(
      createFallbackError(
        response.status,
        'The server returned an invalid response.',
      ),
    );
  }

  return responseBody.data;
}
