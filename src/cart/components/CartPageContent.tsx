"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { Product } from "@/products/products.types";
import { formatPrice } from "@/products/products.logic";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { useCartStore } from "@/cart/cart.store";
import type { CartProduct } from "@/cart/cart.types";

export function CartPageContent({ products }: { products: Product[] }) {
  const items = useCartStore((state) => state.items);
  const hydrated = useCartStore((state) => state.hasHydrated);
  const synchronizeItems = useCartStore((state) => state.synchronizeItems);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (hydrated) synchronizeItems(products);
  }, [hydrated, products, synchronizeItems]);

  const cartProducts: CartProduct[] = items.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    return product ? [{ ...product, quantity: item.quantity }] : [];
  });
  const total = cartProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-8 sm:py-16">
      <header className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">Your ShopBoard</p>
        <h1 className="font-serif text-4xl font-medium tracking-tight">Your shopping bag</h1>
      </header>

      {!hydrated ? (
        <p aria-live="polite" className="rounded-3xl bg-card p-8 text-muted-foreground" role="status">
          Restoring your bag…
        </p>
      ) : cartProducts.length === 0 ? (
        <Card className="rounded-3xl py-8 text-center sm:py-12">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Your bag is taking a little breather.</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-sm text-muted-foreground">Explore the skincare edit and find something for your everyday.</p>
            <Button asChild className="rounded-full">
              <Link href="/products">Browse the collection</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <section aria-label="Items in your bag" className="grid gap-4">
            {cartProducts.map((product) => (
              <article className="grid grid-cols-[5rem_minmax(0,1fr)] gap-4 rounded-3xl border border-border bg-card p-4 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:items-center" key={product.id}>
                <Link className="relative aspect-square overflow-hidden rounded-2xl bg-secondary" href={`/products/${product.id}`}>
                  <Image alt={product.imageAlt} className="object-cover" fill sizes="112px" src={product.image} />
                </Link>
                <div className="min-w-0">
                  <h2 className="font-serif text-lg font-medium leading-snug">
                    <Link className="hover:text-brand" href={`/products/${product.id}`}>{product.name}</Link>
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{formatPrice(product.price)} each</p>
                  <div aria-label={`Quantity for ${product.name}`} className="mt-3 inline-flex items-center gap-2 rounded-full border border-border p-1">
                    <Button aria-label={`Decrease quantity of ${product.name}`} className="size-8 rounded-full" disabled={product.quantity <= 1} onClick={() => decreaseQuantity(product.id)} size="icon" variant="ghost"><Minus aria-hidden="true" /></Button>
                    <span aria-live="polite" className="min-w-5 text-center text-sm tabular-nums">{product.quantity}</span>
                    <Button aria-label={`Increase quantity of ${product.name}`} className="size-8 rounded-full" disabled={product.quantity >= product.stock} onClick={() => increaseQuantity(product.id, products)} size="icon" variant="ghost"><Plus aria-hidden="true" /></Button>
                  </div>
                </div>
                <div className="col-start-2 flex items-center justify-between gap-4 sm:col-start-auto sm:flex-col sm:items-end">
                  <strong className="text-sm">{formatPrice(product.price * product.quantity)}</strong>
                  <Button aria-label={`Remove ${product.name} from bag`} className="rounded-full text-muted-foreground" onClick={() => removeItem(product.id)} size="sm" variant="ghost"><Trash2 aria-hidden="true" /> Remove</Button>
                </div>
              </article>
            ))}
          </section>

          <Card className="rounded-3xl lg:sticky lg:top-24">
            <CardHeader><CardTitle className="font-serif text-xl">Order summary</CardTitle></CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between border-t border-border pt-4 text-base font-semibold">
                <span>Subtotal</span><span>{formatPrice(total)}</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">Shipping and taxes are calculated at checkout.</p>
              <Button asChild className="w-full rounded-full"><Link href="/checkout">Continue to checkout</Link></Button>
              <Button className="w-full rounded-full" onClick={clearCart} variant="ghost">Clear bag</Button>
              <Link className="text-center text-sm text-brand underline-offset-4 hover:underline" href="/products">Continue shopping</Link>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
