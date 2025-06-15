import { useState, useCallback } from 'react';
import type {User, UserRequestDto} from "../types/users.ts";
import {createUser} from "../api/userApi.ts";

export function useCreateUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const create = useCallback(async (payload: UserRequestDto) => {
        setLoading(true);
        setError(null);
        try {
            const newUser: User = await createUser(payload);
            return newUser;
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Ошибка при создании пользователя');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { create, loading, error };
}
