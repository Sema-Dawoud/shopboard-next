import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export default function ProductNotFound() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
        Product not found
      </p>
      <h1 className="font-serif text-3xl font-medium">This product isn’t here.</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        It may have moved, or the product link may be incorrect. Browse the
        collection to find something else.
      </p>
      <Button asChild className="mt-6 rounded-full">
        <Link href="/products">Browse products</Link>
      </Button>
    </main>
  );
}
