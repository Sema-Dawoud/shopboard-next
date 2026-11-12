import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "@/cart/cart.store";
import type { Product } from "@/products/products.types";

function createProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 1,
    name: "Hydrating Serum",
    category: "Skincare",
    price: 25,
    description: "A hydrating serum.",
    image: "/images/serum.webp",
    imageAlt: "Hydrating serum bottle",
    inStock: true,
    stock: 5,
    featured: false,
    ...overrides,
  };
}

describe("cart store", () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({ items: [], hasHydrated: false });
  });

  it("adds an in-stock product with quantity one", () => {
    const product = createProduct();

    const result = useCartStore.getState().addToCart(product.id, [product]);

    expect(result).toBe(true);
    expect(useCartStore.getState().items).toEqual([
      { id: product.id, quantity: 1 },
    ]);
  });

  it("does not increase quantity beyond available stock", () => {
    const product = createProduct({ stock: 2 });

    useCartStore.setState({
      items: [{ id: product.id, quantity: 2 }],
    });

    const result = useCartStore
      .getState()
      .increaseQuantity(product.id, [product]);

    expect(result).toBe(false);
    expect(useCartStore.getState().items).toEqual([
      { id: product.id, quantity: 2 },
    ]);
  });

  it("removes unavailable products and caps quantity to remaining stock", () => {
    const availableProduct = createProduct({
      id: 1,
      stock: 2,
    });

    const unavailableProduct = createProduct({
      id: 2,
      inStock: false,
      stock: 0,
    });

    useCartStore.setState({
      items: [
        { id: availableProduct.id, quantity: 4 },
        { id: unavailableProduct.id, quantity: 1 },
      ],
    });

    useCartStore
      .getState()
      .synchronizeItems([availableProduct, unavailableProduct]);

    expect(useCartStore.getState().items).toEqual([
      { id: availableProduct.id, quantity: 2 },
    ]);
  });
});
