"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/products/products.types";
import { Button } from "@/shared/components/ui/button";
import { useCartStore } from "@/cart/cart.store";

export function AddToCartButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [message, setMessage] = useState("");
  const available = product.inStock && product.stock > 0;

  function handleAdd() {
    setMessage(
      addToCart(product.id, [product])
        ? `${product.name} added to your bag.`
        : "This item is out of stock or the available quantity is already in your bag.",
    );
  }

  return (
    <div className={className}>
      <Button
        aria-label={`Add ${product.name} to bag`}
        className="rounded-full"
        disabled={!available}
        onClick={handleAdd}
        size="sm"
        type="button"
      >
        <ShoppingBag aria-hidden="true" />
        {available ? "Add to bag" : "Out of stock"}
      </Button>
      <span aria-live="polite" className="sr-only" role="status">
        {message}
      </span>
    </div>
  );
}
