import type { Product } from "@/products/products.types";

export interface CartItem {
  id: number;
  quantity: number;
}

export type Cart = CartItem[];

export type CartProduct = Product & { quantity: number };
