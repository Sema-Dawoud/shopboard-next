import { ApiError, fetchJson } from "@/shared/api/client";
import { localProducts } from "@/products/products.data";
import type { Product, ProductCatalog } from "@/products/products.types";

interface ApiProduct {
  id: number;
  title: string;
  description: string;
  category: "skin-care";
  price: number;
  stock: number;
  thumbnail: string;
}

interface ApiProductsResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isApiProduct(value: unknown): value is ApiProduct {
  return (
    isRecord(value) &&
    typeof value.id === "number" &&
    Number.isSafeInteger(value.id) &&
    value.id > 0 &&
    typeof value.title === "string" &&
    value.title.length > 0 &&
    typeof value.description === "string" &&
    value.category === "skin-care" &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    value.price >= 0 &&
    typeof value.stock === "number" &&
    Number.isSafeInteger(value.stock) &&
    value.stock >= 0 &&
    typeof value.thumbnail === "string" &&
    value.thumbnail.length > 0
  );
}

function isApiProductsResponse(value: unknown): value is ApiProductsResponse {
  return (
    isRecord(value) &&
    Array.isArray(value.products) &&
    value.products.every(isApiProduct) &&
    typeof value.total === "number" &&
    Number.isSafeInteger(value.total) &&
    typeof value.skip === "number" &&
    Number.isSafeInteger(value.skip) &&
    typeof value.limit === "number" &&
    Number.isSafeInteger(value.limit) &&
    value.total >= value.products.length &&
    value.skip >= 0 &&
    value.limit >= value.products.length
  );
}

function toProduct(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.id,
    name: apiProduct.title,
    category: "Skincare",
    price: apiProduct.price,
    description: apiProduct.description,
    image: apiProduct.thumbnail,
    imageAlt: apiProduct.title,
    inStock: apiProduct.stock > 0,
    stock: apiProduct.stock,
    featured: false,
  };
}

function mergeProducts(apiProducts: Product[]): Product[] {
  const productsById = new Map<number, Product>();

  for (const product of [...localProducts, ...apiProducts]) {
    if (!productsById.has(product.id)) {
      productsById.set(product.id, product);
    }
  }

  return [...productsById.values()];
}

export async function getProductCatalog(): Promise<ProductCatalog> {
  try {
    const response = await fetchJson("/products/category/skin-care");

    if (!isApiProductsResponse(response)) {
      throw new ApiError(
        "The product service returned an unexpected response.",
      );
    }

    return {
      products: mergeProducts(response.products.map(toProduct)),
      hasApiError: false,
    };
  } catch {
    return { products: localProducts, hasApiError: true };
  }
}

export async function getApiProductById(id: number): Promise<Product> {
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new ApiError("The product could not be found.", 404);
  }

  const response = await fetchJson(`/products/${id}`);

  if (!isApiProduct(response)) {
    throw new ApiError("The product service returned an unexpected response.");
  }

  return toProduct(response);
}
