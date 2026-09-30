export type ApiError = {
  code: string;
  title: string;
  message: string;
  requestId: string;
};

export type ApiErrorResponse = {
  error: ApiError;
};

export type ApiResponse<T> = {
  success: boolean;
  requestId: string;
  title: string;
  message: string;
  response: T;
};