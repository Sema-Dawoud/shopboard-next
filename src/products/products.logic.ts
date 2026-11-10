import type {
  Product,
  ProductCategoryFilter,
  ProductSortOrder,
} from "@/products/products.types";

export function searchProducts(
  products: readonly Product[],
  searchTerm: string,
): Product[] {
  const query = searchTerm.trim().toLocaleLowerCase();

  if (query.length === 0) {
    return [...products];
  }

  return products.filter((product) =>
    [product.name, product.category, product.description]
      .join(" ")
      .toLocaleLowerCase()
      .includes(query),
  );
}

export function getProductCategories(
  products: readonly Product[],
): Product["category"][] {
  return [...new Set(products.map((product) => product.category))].sort(
    (left, right) => left.localeCompare(right),
  );
}

export function filterProducts(
  products: readonly Product[],
  category: ProductCategoryFilter,
): Product[] {
  if (category === "all") {
    return [...products];
  }

  return products.filter((product) => product.category === category);
}

export function sortProducts(
  products: readonly Product[],
  sortOrder: ProductSortOrder,
): Product[] {
  const sortedProducts = [...products];

  if (sortOrder === "low-high") {
    return sortedProducts.sort((left, right) => left.price - right.price);
  }

  if (sortOrder === "high-low") {
    return sortedProducts.sort((left, right) => right.price - left.price);
  }

  return sortedProducts;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
