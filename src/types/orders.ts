export interface OrderRequestDto {
    userId: string;
    deliveryAddress: string;
}

export interface OrderResponseDto {
    cartId: string;
    userId: string;
    deliveryAddress: string;
}

export interface Page<T> {
    totalOrders: number;
    currentPage: number;
    ordersInPage: number;
    orders: T[];
}

export interface OrderLogResponseDto {
    orderId: string;
    status: string;
    createdAt: string;
}