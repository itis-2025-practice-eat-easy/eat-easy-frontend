import http from './http';

export interface LoginRequest {
    login: string;
    password: string;
    fingerprint: string;
}

export interface TokenResponse {
    access: string;
    refresh: string;
}

export interface RefreshRequest {
    fingerprint: string;
    refreshToken?: string;
}

const AUTH_SERVER = 'http://5.104.75.208:8080';

export async function loginApi(payload: LoginRequest): Promise<TokenResponse> {
    // Передаём полный URL к эндпоинту аутентификации
    const resp = await http.post<TokenResponse>(
        `${AUTH_SERVER}/api/v1/auth/login`,
        payload,
        { withCredentials: true }
    );
    return resp.data;
}

export async function refreshApi(payload: RefreshRequest): Promise<TokenResponse> {
    const resp = await http.post<TokenResponse>(
        '/api/v1/auth/refresh',
        payload,
        { withCredentials: true }
    );
    return resp.data;
}

export async function logoutApi(): Promise<void> {
    await http.post(
        '/api/v1/auth/logout',
        {},
        { withCredentials: true }
    );
}
