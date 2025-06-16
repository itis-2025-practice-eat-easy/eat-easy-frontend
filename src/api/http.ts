import axios, {  type AxiosError} from 'axios';
import type { LoginRequest, TokenResponse, RefreshRequest } from './authApi';


const http = axios.create({
    baseURL: '',
    headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

http.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export async function loginApi(payload: LoginRequest): Promise<TokenResponse> {
    const resp = await http.post<TokenResponse>('/api/v1/auth/login', payload, {
        withCredentials: true,
    });
    return resp.data;
}

export async function refreshApi(payload: RefreshRequest): Promise<TokenResponse> {
    const resp = await http.post<TokenResponse>('/api/v1/auth/refresh', payload, {
        withCredentials: true,
    });
    return resp.data;
}

export async function logoutApi(): Promise<void> {
    await http.post('/api/v1/auth/logout', {}, {
        withCredentials: true,
    });
}


export default http;
