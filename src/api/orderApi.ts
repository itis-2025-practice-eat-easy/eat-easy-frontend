import http from './http';
import type {
    OrderRequestDto,
    OrderResponseDto,
    Page,
    OrderLogResponseDto
} from '../types/orders';

export async function createOrder(dto: OrderRequestDto): Promise<OrderResponseDto> {
    const resp = await http.post<OrderResponseDto>('/api/v1/orders', dto);
    return resp.data;
}

export async function getUserOrders(
    userId: string,
    page = 0,
    pageSize = 10,
    actual = true
): Promise<Page<OrderResponseDto>> {
    const resp = await http.get<Page<OrderResponseDto>>(
        `/api/v1/users/${userId}/orders`,
        { params: { page, page_size: pageSize, actual } }
    );
    return resp.data;
}

export async function getOrderById(orderId: string): Promise<OrderResponseDto> {
    const resp = await http.get<OrderResponseDto>(`/api/v1/orders/${orderId}`);
    return resp.data;
}

export async function getOrderStatusHistory(orderId: string): Promise<OrderLogResponseDto[]> {
    const resp = await http.get<OrderLogResponseDto[]>(`/api/v1/orders/${orderId}/info`);
    return resp.data;
}
