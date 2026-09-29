export const endpoints = {
    health: '/health',
    login: '/auth/login',
} as const;

export const noAuthorizationRequired = [
    endpoints.health,
    endpoints.login,
] as const;