import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { formatPrice } from "@/products/products.logic";
import type { Product } from "@/products/products.types";
import { AddToCartButton } from "@/cart/components/AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="h-full">
      <Card className="group h-full gap-0 rounded-3xl py-0">
        <Link
          aria-label={`View ${product.name}`}
          className="relative block aspect-[4/3] overflow-hidden bg-secondary"
          href={`/products/${product.id}`}
        >
          <Image
            alt={product.imageAlt}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            src={product.image}
          />
        </Link>

        <CardHeader className="gap-3 p-5 pb-2">
          <Badge className="w-fit" variant="secondary">
            {product.category}
          </Badge>
          <CardTitle as="h3" className="font-serif text-lg font-medium leading-snug">
            <Link className="hover:text-brand" href={`/products/${product.id}`}>
              {product.name}
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-4 p-5 pt-0">
          <p className="line-clamp-2 min-h-10 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
            <span className="font-semibold text-brand">
              {formatPrice(product.price)}
            </span>
            <Button asChild className="rounded-full" size="sm" variant="outline">
              <Link href={`/products/${product.id}`}>View details</Link>
            </Button>
            <AddToCartButton className="w-full" product={product} />
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
