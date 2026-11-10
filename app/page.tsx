import type { Metadata } from "next";
import { Suspense } from "react";
import { HomePageContent } from "@/home/components/HomePageContent";
import { getProductCatalog } from "@/products/products.api";

export const metadata: Metadata = {
  title: "ShopBoard Beauty | Thoughtful care, every day",
  description:
    "Discover considered skincare for the everyday rituals that make a day yours.",
};

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <main aria-busy="true" className="mx-auto min-h-[70vh] max-w-7xl px-4 py-20 sm:px-8">
          <div className="h-4 w-40 animate-pulse rounded bg-secondary" />
          <div className="mt-5 h-16 max-w-xl animate-pulse rounded-2xl bg-secondary" />
          <div className="mt-10 aspect-[1.5] animate-pulse rounded-3xl bg-secondary" />
        </main>
      }
    >
      <HomePageData />
    </Suspense>
  );
}

async function HomePageData() {
  const { products } = await getProductCatalog();

  return <HomePageContent products={products} />;
}
