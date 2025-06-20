import { useState, useCallback } from 'react';
import {type LoginRequest, logoutApi, refreshApi, type TokenResponse,} from '../api/authApi';
import { loginApi} from '../api/authApi';

export function useAuthActions() {
    const [loading, setLoading] = useState(false);
    const [error,   setError]   = useState<string | null>(null);

    const login = useCallback(async (payload: LoginRequest): Promise<TokenResponse> => {
        setLoading(true);
        setError(null);
        try {
            const tokens = await loginApi(payload);
            localStorage.setItem('accessToken', tokens.access);
            localStorage.setItem('refreshToken', tokens.refresh);
            return tokens;
        } catch (err: any) {
            setError(err.response?.data?.error || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const refresh = useCallback(async (fingerprint: string, refreshToken: string): Promise<TokenResponse> => {
        setLoading(true);
        try {
            const tokens = await refreshApi({ fingerprint, refreshToken });
            localStorage.setItem('accessToken', tokens.access);
            localStorage.setItem('refreshToken', tokens.refresh);
            return tokens;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async (): Promise<void> => {
        setLoading(true);
        try {
            await logoutApi();
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        } finally {
            setLoading(false);
        }
    }, []);

    return { login, refresh, logout, loading, error };
}
