import http from './http';
import type {
    Product,
    ProductRequestDto,
    ProductUpdateRequestDto
} from '../types/products';

export async function getAllProducts(): Promise<Product[]> {
    const resp = await http.get<Product[]>('/api/v1/products');
    return resp.data;
}

export async function getProductById(id: string): Promise<Product> {
    const resp = await http.get<Product>(`/api/v1/products/${id}`);
    return resp.data;
}

export async function createProduct(dto: ProductRequestDto): Promise<Product> {
    const resp = await http.post<Product>('/api/v1/products', dto);
    return resp.data;
}

export async function updateProduct(id: string, dto: ProductUpdateRequestDto): Promise<void> {
    await http.patch(`/api/v1/products/${id}`, dto);
}

export async function deleteProduct(id: string): Promise<void> {
    await http.delete(`/api/v1/products/${id}`);
}

export async function updateProductQuantity(id: string, delta: number): Promise<void> {
    await http.patch(`/api/v1/products/${id}/count`, delta);
}
