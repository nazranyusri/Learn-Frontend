export const endpoints = {
    health: '/health',
    login: '/auth/login',
    register: '/auth/register',
} as const;

export const noAuthorizationRequired = [
    endpoints.health,
    endpoints.login,
    endpoints.register,
] as const;