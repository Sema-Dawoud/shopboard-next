import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/cart/components/AddToCartButton";
import { ApiError } from "@/shared/api/client";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { getApiProductById } from "@/products/products.api";
import { localProducts } from "@/products/products.data";
import { formatPrice } from "@/products/products.logic";
import type { Product } from "@/products/products.types";

function parseProductId(value: string): number | null {
  if (!/^[1-9]\d*$/.test(value)) {
    return null;
  }

  const id = Number(value);
  return Number.isSafeInteger(id) ? id : null;
}

function ProductDetails({ product }: { product: Product }) {
  return (
    <main className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 md:items-center md:gap-12 md:px-8 md:py-16">
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-secondary">
        <Image
          alt={product.imageAlt}
          className="object-cover"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          src={product.image}
        />
      </div>

      <Card className="gap-5 rounded-[2rem] border-brand/10 p-6 shadow-none sm:p-8">
        <CardHeader className="gap-4 p-0">
          <Badge className="w-fit" variant="secondary">
            {product.category}
          </Badge>
          <CardTitle
            as="h1"
            className="font-serif text-3xl font-medium leading-tight sm:text-4xl"
          >
            {product.name}
          </CardTitle>
          <CardDescription className="text-base leading-relaxed">
            {product.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 p-0">
          <p className="text-2xl font-semibold text-brand">
            {formatPrice(product.price)}
          </p>
          <p className="text-sm text-muted-foreground">
            {product.inStock ? "Available" : "Currently unavailable"}
          </p>
          <AddToCartButton className="w-fit" product={product} />
          <Button asChild className="w-fit rounded-full" variant="outline">
            <Link href="/products">Back to products</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

function ProductLoadError() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="font-serif text-3xl font-medium">
        We couldn’t load this product.
      </h1>
      <p className="mt-3 text-muted-foreground">
        The product service is temporarily unavailable. Please try again later,
        or browse the local collection.
      </p>
      <Button asChild className="mt-6 rounded-full">
        <Link href="/products">Browse products</Link>
      </Button>
    </main>
  );
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  const id = parseProductId(rawId);

  if (id === null) {
    notFound();
  }

  const localProduct = localProducts.find((product) => product.id === id);

  if (localProduct) {
    return <ProductDetails product={localProduct} />;
  }

  let product: Product | undefined;

  try {
    product = await getApiProductById(id);
  } catch (error: unknown) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
  }

  if (!product) {
    return <ProductLoadError />;
  }

  return <ProductDetails product={product} />;
}
