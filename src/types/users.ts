export interface UserRequestDto {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
}

export interface UserResponseDto {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role?: string;
}

export interface UserWithHashPasswordResponseDto {
    userResponseDto: UserResponseDto;
    hashPassword: string;  // ≥60 chars
}

export interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role?: string;
}

export function mapResponseDtoToUser(dto: UserResponseDto): User {
    return {
        id: dto.id,
        username: dto.username,
        email: dto.email,
        firstName: dto.first_name,
        lastName: dto.last_name,
        role: dto.role,
    };
}
export function mapUserToRequestDto(user: Partial<User> & { password?: string }): Partial<UserRequestDto> {
    const dto: Partial<UserRequestDto> = {};
    if (user.username !== undefined) dto.username = user.username;
    if (user.email !== undefined) dto.email = user.email;
    if (user.firstName !== undefined) dto.firstName = user.firstName;
    if (user.lastName !== undefined) dto.lastName = user.lastName;
    if (user.role !== undefined) dto.role = user.role;
    if (user.password !== undefined) dto.password = user.password;
    return dto;
}
