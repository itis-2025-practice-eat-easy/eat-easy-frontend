import { useState, useCallback } from 'react';
import {loginApi, type LoginRequest, type LoginResponse} from "../api/authApi.ts";

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = useCallback(async (payload: LoginRequest): Promise<LoginResponse> => {
        setLoading(true);
        setError(null);
        try {
            const data = await loginApi(payload);
            return data;
        } catch (err: any) {
            const msg =
                err.response?.data?.message ||
                err.message ||
                'Ошибка при входе';
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { login, loading, error };
}
