import type { ApiError } from '@/schemas';

export class ApiRequestError extends Error {
  readonly code: string;
  readonly title: string;
  readonly requestId: string;

  constructor(details: ApiError) {
    super(details.message);
    this.code = details.code;
    this.title = details.title;
    this.requestId = details.requestId;
  }
}