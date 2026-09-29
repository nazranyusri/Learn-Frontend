export type ApiError = {
  code: string;
  title: string;
  message: string;
  requestId: string;
};

export type ApiErrorResponse = {
  error: ApiError;
};