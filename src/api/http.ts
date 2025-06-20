import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { refreshApi } from './authApi';

const http = axios.create({
    baseURL: 'http://5.104.75.208:8080',
    headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(cfg => {
    const token = localStorage.getItem('accessToken');
    if (token && cfg.headers) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
});

http.interceptors.response.use(
    res => res,
    async (error: AxiosError & { config?: AxiosRequestConfig & { __retry?: boolean } }) => {
        const cfg = error.config;
        if (error.response?.status === 401 && cfg && !cfg.__retry) {
            cfg.__retry = true;
            const fingerprint = localStorage.getItem('fingerprint')!;
            const refreshToken = localStorage.getItem('refreshToken')!;
            try {
                const tokens = await refreshApi({ fingerprint, refreshToken });
                localStorage.setItem('accessToken', tokens.access);
                localStorage.setItem('refreshToken', tokens.refresh);
                if (cfg.headers) cfg.headers.Authorization = `Bearer ${tokens.access}`;
                return http.request(cfg);
            } catch {
            }
        }
        return Promise.reject(error);
    }
);

export default http;