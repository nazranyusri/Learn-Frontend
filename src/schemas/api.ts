export type ApiSuccess<T> = {
  status: number;
  requestId: string;
  data: T;
};

export type ApiFieldError = {
  field: string;
  message: string;
};

export type ApiError = {
  status: number;
  requestId: string;
  title: string;
  detail: string;
  code: string;
  errors: ApiFieldError[];
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
