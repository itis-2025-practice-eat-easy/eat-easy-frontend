import { useState, useEffect, useCallback } from 'react';
import type {User} from "../types/users.ts";
import {deleteUser, getUserById, updateUser} from "../api/userApi.ts";

export function useUser(userId: string | null) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        setError(null);
        try {
            const data = await getUserById(userId);
            setUser(data);
        } catch (err: any) {
            if (err.response?.status === 404) {
                setUser(null);
            } else {
                setError(err.message || 'Ошибка при получении пользователя');
            }
        } finally {
            setLoading(false);
        }
    }, [userId]);

    const saveUser = useCallback(
        async (updatedFields: Partial<User> & { password?: string }) => {
            if (!userId) throw new Error('userId отсутствует');
            setLoading(true);
            setError(null);
            try {
                const updated = await updateUser(userId, updatedFields as any);
                setUser(updated);
                return updated;
            } catch (err: any) {
                setError(err.message || 'Ошибка при обновлении пользователя');
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [userId]
    );

    const removeUser = useCallback(async () => {
        if (!userId) throw new Error('userId отсутствует');
        setLoading(true);
        setError(null);
        try {
            await deleteUser(userId);
            setUser(null);
        } catch (err: any) {
            setError(err.message || 'Ошибка при удалении пользователя');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return { user, loading, error, refetch: fetchUser, saveUser, removeUser };
}
