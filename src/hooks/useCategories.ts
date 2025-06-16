import { useState, useEffect, useCallback } from 'react';
import type { Category } from '../types/products';
import { getAllCategories, createCategory } from '../api/categoryApi';

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading]     = useState(false);
    const [error, setError]         = useState<string | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const create = useCallback(async (title: string) => {
        setLoading(true);
        try {
            const cat = await createCategory({ title });
            setCategories(prev => [...prev, cat]);
            return cat;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetch(); }, [fetch]);

    return { categories, loading, error, refetch: fetch, create };
}
