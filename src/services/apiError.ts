import type { ApiError } from '@/schemas';

export class ApiRequestError extends Error {
  readonly status: number;
  readonly code: string;
  readonly title: string;
  readonly detail: string;
  readonly requestId: string;
  readonly errors: ApiError['errors'];

  constructor(details: ApiError) {
    super(details.detail);
    this.name = 'ApiRequestError';
    this.status = details.status;
    this.code = details.code;
    this.title = details.title;
    this.detail = details.detail;
    this.requestId = details.requestId;
    this.errors = details.errors;
  }
}
