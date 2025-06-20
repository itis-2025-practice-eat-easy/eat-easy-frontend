import axios from 'axios';
export type TokenResponse =
    { access: string;
        refresh: string
    };
export interface LoginRequest {
    login: string;
    password: string;
    fingerprint: string;
}
export interface RefreshRequest {
    fingerprint: string;
    refreshToken: string;
}

const API_BASE = 'http://5.104.75.208:8080';

export async function loginApi(payload: LoginRequest): Promise<TokenResponse> {
    const { data } = await axios.post<TokenResponse>(
        `${API_BASE}/api/v1/auth/login`,
        payload
    );
    return data;
}

export async function refreshApi(payload: RefreshRequest): Promise<TokenResponse> {
    const { data } = await axios.post<TokenResponse>(
        `${API_BASE}/api/v1/auth/refresh`,
        {
            fingerprint: payload.fingerprint,
            refreshToken: payload.refreshToken,
        }
    );
    return data;
}

export async function logoutApi(): Promise<void> {
    await axios.post(
        `${API_BASE}/api/v1/auth/logout`,
        {}
    );
}
