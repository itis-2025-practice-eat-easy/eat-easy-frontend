import { useState, useEffect, useCallback } from 'react';
import type {
    OrderLogResponseDto,
    OrderRequestDto,
    OrderResponseDto,
    Page
} from '../types/orders';
import {
    getUserOrders,
    createOrder,
    getOrderById,
    getOrderStatusHistory
} from '../api/orderApi';

export function useUserOrders(userId: string | null) {
    const [pageData, setPageData] = useState<Page<OrderResponseDto> | null>(null);
    const [loading, setLoading]   = useState(false);
    const [error, setError]       = useState<string | null>(null);

    const fetchPage = useCallback(async (
        page = 0,
        pageSize = 10,
        actual = true
    ) => {
        if (!userId) return;
        setLoading(true);
        try {
            const data = await getUserOrders(userId, page, pageSize, actual);
            setPageData(data);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => { fetchPage(); }, [fetchPage]);

    return { pageData, loading, error, refetch: fetchPage };
}

export function useOrder(orderId: string | null) {
    const [order, setOrder]     = useState<OrderResponseDto | null>(null);
    const [history, setHistory] = useState<OrderLogResponseDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState<string | null>(null);

    const fetchDetails = useCallback(async () => {
        if (!orderId) return;
        setLoading(true);
        try {
            const [ord, log] = await Promise.all([
                getOrderById(orderId),
                getOrderStatusHistory(orderId)
            ]);
            setOrder(ord);
            setHistory(log);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [orderId]);

    useEffect(() => { fetchDetails(); }, [fetchDetails]);

    return { order, history, loading, error, refetch: fetchDetails };
}

export function useCreateOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState<string | null>(null);

    const create = useCallback(async (dto: OrderRequestDto) => {
        setLoading(true);
        try {
            return await createOrder(dto);
        } catch (e: any) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    return { create, loading, error };
}
