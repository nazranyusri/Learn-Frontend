export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  displayName: string;
};

export type RegisterResponse = {
  accessToken: string;
  displayName: string;
};