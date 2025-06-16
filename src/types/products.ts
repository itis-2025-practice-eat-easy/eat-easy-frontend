export interface Category {
    id: string;
    title: string;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    photoUrl: string;
    price: number;
    categories: Category[];
    quantity: number;
    createdAt: string;
    popularity: number;
}

export interface CategoryRequestDto {
    title: string;
}

export interface ProductRequestDto {
    title: string;
    description: string;
    photoUrl: string;
    price: number;
    categories: string[];
    quantity: number;
}

export interface ProductUpdateRequestDto {
    title?: string;
    description?: string;
    photoUrl?: string;
    price?: number;
    categories?: string[];
    quantity?: number;
}
