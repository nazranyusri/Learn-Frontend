export const endpoints = {
    health: 'api/v1/health',
    login: 'api/v1/auth/login',
    register: 'api/v1/auth/register',
    getAccounts: 'api/v1/account',
    getAccount: 'api/v1/account',
    addAccount: 'api/v1/account',
} as const;

export const noAuthorizationRequired = [
    endpoints.health,
    endpoints.login,
    endpoints.register,
] as const;