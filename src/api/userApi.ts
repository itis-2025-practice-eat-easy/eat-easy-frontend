import http from './http';
import {mapResponseDtoToUser, type User, type UserRequestDto, type UserResponseDto} from "../types/users.ts";

export async function getUserById(id: string): Promise<User> {
    const resp = await http.get<UserResponseDto>(`/api/v1/users/${id}`);
    return mapResponseDtoToUser(resp.data);
}

export async function getUserByEmail(email: string): Promise<User> {
    const resp = await http.get<UserResponseDto>('/api/v1/users', { params: { email } });
    return mapResponseDtoToUser(resp.data);
}

export async function createUser(payload: UserRequestDto): Promise<User> {
    const resp = await http.post<UserResponseDto>('/api/v1/users', payload);
    return mapResponseDtoToUser(resp.data);
}

export async function updateUser(id: string, payload: Partial<UserRequestDto>): Promise<User> {
    const resp = await http.put<UserResponseDto>(`/api/v1/users/${id}`, payload);
    return mapResponseDtoToUser(resp.data);
}

export async function deleteUser(id: string): Promise<void> {
    await http.delete(`/api/v1/users/${id}`);
}


