import { Suspense } from "react";
import { CartPageContent } from "@/cart/components/CartPageContent";
import { getProductCatalog } from "@/products/products.api";

export default function CartPage() {
  return (
    <Suspense fallback={<main aria-busy="true" className="mx-auto min-h-[60vh] max-w-5xl px-4 py-12 sm:px-8"><div className="h-10 w-64 animate-pulse rounded bg-secondary" /></main>}>
      <CartPageData />
    </Suspense>
  );
}

async function CartPageData() {
  const { products } = await getProductCatalog();
  return <CartPageContent products={products} />;
}
