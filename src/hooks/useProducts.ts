import { useState, useEffect, useCallback } from 'react';
import type { Product, ProductRequestDto, ProductUpdateRequestDto } from '../types/products';
import {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    updateProductQuantity
} from '../api/productApi';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading]   = useState(false);
    const [error, setError]       = useState<string | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const create = useCallback(async (dto: ProductRequestDto) => {
        setLoading(true);
        try {
            const prod = await createProduct(dto);
            setProducts(prev => [...prev, prod]);
            return prod;
        } finally {
            setLoading(false);
        }
    }, []);

    const update = useCallback(async (id: string, dto: ProductUpdateRequestDto) => {
        setLoading(true);
        try {
            await updateProduct(id, dto);
            // можно перезапросить детали или просто refetch()
            await fetch();
        } finally {
            setLoading(false);
        }
    }, [fetch]);

    const remove = useCallback(async (id: string) => {
        setLoading(true);
        try {
            await deleteProduct(id);
            setProducts(prev => prev.filter(p => p.id !== id));
        } finally {
            setLoading(false);
        }
    }, []);

    const changeQty = useCallback(async (id: string, delta: number) => {
        setLoading(true);
        try {
            await updateProductQuantity(id, delta);
            await fetch();
        } finally {
            setLoading(false);
        }
    }, [fetch]);

    useEffect(() => { fetch(); }, [fetch]);

    return { products, loading, error, refetch: fetch, create, update, remove, changeQty };
}
