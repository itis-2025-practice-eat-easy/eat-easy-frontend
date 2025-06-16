import http from './http';
import type { Category, CategoryRequestDto } from '../types/products';

export async function getAllCategories(): Promise<Category[]> {
    const resp = await http.get<Category[]>('/api/v1/categories');
    return resp.data;
}

export async function createCategory(dto: CategoryRequestDto): Promise<Category> {
    const resp = await http.post<Category>('/api/v1/categories', dto);
    return resp.data;
}
