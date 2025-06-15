import http from './http';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        username?: string;
        email?: string;
        firstName?: string;
        lastName?: string;
    };
}

export async function loginApi(payload: LoginRequest): Promise<LoginResponse> {
    const response = await http.post<LoginResponse>('/api/v1/auth/login', payload);
    return response.data;
}
