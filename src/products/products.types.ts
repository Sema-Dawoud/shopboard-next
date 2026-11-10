export type ProductCategory = "Skincare";

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  image: string;
  imageAlt: string;
  inStock: boolean;
  stock: number;
  featured: boolean;
}

export type ProductCategoryFilter = "all" | ProductCategory;

export type ProductSortOrder = "default" | "low-high" | "high-low";

export interface ProductCatalog {
  products: Product[];
  hasApiError: boolean;
}
