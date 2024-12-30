//src/app/products/models/product.models.ts
export interface CreateProductCommand {
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    categoria: string;
}

export interface UpdateProductCommand {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    categoria: string;
}

export interface DeleteProductCommand{
    id: number;
}

export interface ProductResponse {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    categoria: string;
}