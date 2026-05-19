// src/app/core/models/product.model.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  available: boolean;
  category?: string;
}

export interface ProductsResponse {
  ok: boolean;
  data: Product[];
}