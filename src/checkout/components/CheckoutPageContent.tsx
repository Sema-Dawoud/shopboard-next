"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { InputHTMLAttributes } from "react";
import { formatPrice } from "@/products/products.logic";
import type { Product } from "@/products/products.types";
import { useCartStore } from "@/cart/cart.store";
import type { CartProduct } from "@/cart/cart.types";
import {
  checkoutSchema,
  type CheckoutValues,
} from "@/checkout/checkout.schema";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";

type FieldName = keyof CheckoutValues;
interface CheckoutField {
  name: FieldName;
  label: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  autoComplete: string;
}

const fields: readonly CheckoutField[] = [
  { name: "fullName", label: "Full name", type: "text", autoComplete: "name" },
  {
    name: "email",
    label: "Email address",
    type: "email",
    autoComplete: "email",
  },
  { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
  {
    name: "address",
    label: "Street address",
    type: "text",
    autoComplete: "street-address",
  },
  { name: "city", label: "City", type: "text", autoComplete: "address-level2" },
  {
    name: "postalCode",
    label: "Postal code",
    type: "text",
    autoComplete: "postal-code",
  },
];

export function CheckoutPageContent({ products }: { products: Product[] }) {
  const items = useCartStore((state) => state.items);
  const hydrated = useCartStore((state) => state.hasHydrated);
  const synchronizeItems = useCartStore((state) => state.synchronizeItems);
  const clearCart = useCartStore((state) => state.clearCart);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    if (hydrated) synchronizeItems(products);
  }, [hydrated, products, synchronizeItems]);

  const cartProducts: CartProduct[] = items.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    return product ? [{ ...product, quantity: item.quantity }] : [];
  });
  const total = cartProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  async function submitOrder() {
    await Promise.resolve();
    clearCart();
    setOrderPlaced(true);
  }

  if (!hydrated) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-8">
        <p aria-live="polite" role="status">
          Restoring your bag…
        </p>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-8">
        <Card
          className="mx-auto max-w-2xl rounded-3xl py-8 sm:py-12"
          role="status"
        >
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Order confirmed
            </p>
            <CardTitle as="h1" className="font-serif text-3xl">
              Thank you for your order.
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Your mock order is confirmed. Your bag is now clear. No payment
              was collected.
            </p>
            <Button asChild className="w-fit rounded-full">
              <Link href="/products">Continue shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!cartProducts.length) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Checkout
        </p>
        <h1 className="font-serif text-4xl font-medium">Your bag is empty.</h1>
        <p className="mt-3 text-muted-foreground">
          Add something lovely to your bag before checking out.
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/products">Browse the collection</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8 sm:py-16">
      <header className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Checkout
        </p>
        <h1 className="font-serif text-4xl font-medium tracking-tight">
          A few details, then it’s yours.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Enter your shipping details to place your order.
        </p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(17rem,0.8fr)]">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="font-serif text-xl">
              Shipping details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-5 sm:grid-cols-2"
              noValidate
              onSubmit={form.handleSubmit(submitOrder)}
            >
              {fields.map(({ name, label, type, autoComplete }) => {
                const error = form.formState.errors[name];
                const errorId = `${name}-error`;
                return (
                  <div className="grid content-start gap-2" key={name}>
                    <label className="text-sm font-medium" htmlFor={name}>
                      {label}
                    </label>
                    <Input
                      aria-describedby={error ? errorId : undefined}
                      aria-invalid={error ? true : undefined}
                      autoComplete={autoComplete}
                      id={name}
                      type={type}
                      {...form.register(name)}
                    />
                    {error?.message ? (
                      <p
                        className="text-sm text-destructive"
                        id={errorId}
                        role="alert"
                      >
                        {error.message}
                      </p>
                    ) : null}
                  </div>
                );
              })}
              <Button
                className="rounded-full sm:col-span-2"
                disabled={form.formState.isSubmitting}
                type="submit"
              >
                {form.formState.isSubmitting
                  ? "Placing your mock order…"
                  : `Place mock order · ${formatPrice(total)}`}
              </Button>
              <p className="text-center text-xs text-muted-foreground sm:col-span-2">
                This demo does not process payments or collect card details.
              </p>
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-3xl lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Order summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-4">
              {cartProducts.map((product) => (
                <li
                  className="flex justify-between gap-4 text-sm"
                  key={product.id}
                >
                  <span>
                    {product.name}
                    <small className="mt-1 block text-muted-foreground">
                      Qty {product.quantity}
                    </small>
                  </span>
                  <strong className="whitespace-nowrap">
                    {formatPrice(product.price * product.quantity)}
                  </strong>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex justify-between border-t border-border pt-4 font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link
              className="mt-5 inline-block text-sm text-brand underline-offset-4 hover:underline"
              href="/cart"
            >
              Edit your bag
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
