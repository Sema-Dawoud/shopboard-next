import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem } from "@/cart/cart.types";
import type { Product } from "@/products/products.types";

const STORAGE_KEY = "shopboard-cart-v1";

interface CartStore {
  items: CartItem[];
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  addToCart: (productId: number, products: readonly Product[]) => boolean;
  increaseQuantity: (
    productId: number,
    products: readonly Product[],
  ) => boolean;
  decreaseQuantity: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  synchronizeItems: (products: readonly Product[]) => void;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseCartItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is CartItem =>
      isRecord(item) &&
      typeof item.id === "number" &&
      Number.isSafeInteger(item.id) &&
      item.id > 0 &&
      typeof item.quantity === "number" &&
      Number.isSafeInteger(item.quantity) &&
      item.quantity > 0,
  );
}

const safeStorage = createJSONStorage<CartStore>(() => ({
  getItem(name): string | null {
    try {
      const storedValue = window.localStorage.getItem(name);
      if (storedValue === null) return null;

      try {
        JSON.parse(storedValue);
        return storedValue;
      } catch {
        window.localStorage.removeItem(name);
        return null;
      }
    } catch {
      return null;
    }
  },

  setItem(name, value: string): void {
    try {
      window.localStorage.setItem(name, value);
    } catch {
      // Keep the in-memory cart usable when storage is unavailable or full.
    }
  },

  removeItem(name): void {
    try {
      window.localStorage.removeItem(name);
    } catch {
      // Storage may be disabled by the browser.
    }
  },
}));

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,

      setHasHydrated: (hasHydrated) => set({ hasHydrated }),

      addToCart: (productId, products) => {
        const product = products.find(
          (candidate) => candidate.id === productId,
        );

        if (!product?.inStock || product.stock < 1) return false;

        const existing = get().items.find((item) => item.id === productId);

        if (existing && existing.quantity >= product.stock) return false;

        set((state) => ({
          items: existing
            ? state.items.map((item) =>
                item.id === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              )
            : [...state.items, { id: productId, quantity: 1 }],
        }));

        return true;
      },

      increaseQuantity: (productId, products) =>
        get().addToCart(productId, products),

      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.flatMap((item) =>
            item.id !== productId
              ? [item]
              : item.quantity > 1
                ? [{ ...item, quantity: item.quantity - 1 }]
                : [],
          ),
        })),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      clearCart: () => set({ items: [] }),

      synchronizeItems: (products) =>
        set((state) => ({
          items: state.items.flatMap((item) => {
            const product = products.find(
              (candidate) => candidate.id === item.id,
            );

            if (!product?.inStock || product.stock < 1) return [];

            return [
              { ...item, quantity: Math.min(item.quantity, product.stock) },
            ];
          }),
        })),
    }),
    {
      name: STORAGE_KEY,
      storage: safeStorage,
      skipHydration: true,

      partialize: (state) => ({ items: state.items }) as CartStore,

      merge: (persistedState, currentState) => {
        if (Array.isArray(persistedState)) {
          return {
            ...currentState,
            items: parseCartItems(persistedState),
          };
        }

        return {
          ...currentState,
          items: isRecord(persistedState)
            ? parseCartItems(persistedState.items)
            : [],
        };
      },

      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);

export async function rehydrateCart(): Promise<void> {
  await useCartStore.persist.rehydrate();
  useCartStore.getState().setHasHydrated(true);
}
