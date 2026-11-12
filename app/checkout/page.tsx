import { Suspense } from "react";
import { CheckoutPageContent } from "@/checkout/components/CheckoutPageContent";
import { getProductCatalog } from "@/products/products.api";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main
          aria-busy="true"
          className="mx-auto min-h-[60vh] max-w-6xl px-4 py-12 sm:px-8"
        >
          <div className="h-10 w-64 animate-pulse rounded bg-secondary" />
        </main>
      }
    >
      <CheckoutPageData />
    </Suspense>
  );
}

async function CheckoutPageData() {
  const { products } = await getProductCatalog();
  return <CheckoutPageContent products={products} />;
}
