"use client";

import { useEffect, type ReactNode } from "react";
import { rehydrateCart } from "@/cart/cart.store";

export function CartHydration({ children }: { children: ReactNode }) {
  useEffect(() => {
    void rehydrateCart();
  }, []);

  return children;
}
