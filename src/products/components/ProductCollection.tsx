import Link from "next/link";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { ProductCard } from "@/products/components/ProductCard";
import {
  filterProducts,
  getProductCategories,
  searchProducts,
  sortProducts,
} from "@/products/products.logic";
import type {
  Product,
  ProductCategoryFilter,
  ProductSortOrder,
} from "@/products/products.types";

interface ProductCollectionProps {
  products: Product[];
  searchTerm: string;
  category: ProductCategoryFilter;
  sortOrder: ProductSortOrder;
  hasApiError: boolean;
}

export function ProductCollection({
  products,
  searchTerm,
  category,
  sortOrder,
  hasApiError,
}: ProductCollectionProps) {
  const categories = getProductCategories(products);
  const searchedProducts = searchProducts(products, searchTerm);
  const filteredProducts = filterProducts(searchedProducts, category);
  const visibleProducts = sortProducts(filteredProducts, sortOrder);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-16">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            The full collection
          </p>
          <h1 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
            Find your everyday essential.
          </h1>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thoughtful skincare for the rituals that make a day yours.
        </p>
      </header>

      {hasApiError ? (
        <p
          className="mb-6 rounded-2xl border border-brand/15 bg-brand-soft/60 px-4 py-3 text-sm text-brand"
          role="status"
        >
          The online collection is temporarily unavailable. Browse our local
          skincare edit below.
        </p>
      ) : null}

      <form
        action="/products"
        className="mb-8 grid gap-4 rounded-3xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-[minmax(12rem,1.5fr)_1fr_1fr_auto_auto] lg:items-end"
        method="get"
      >
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="product-search">
            Search products
          </label>
          <Input
            defaultValue={searchTerm}
            id="product-search"
            name="q"
            placeholder="Try cleanser or serum"
            type="search"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="category-filter">
            Category
          </label>
          <select
            className="h-9 w-full rounded-4xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            defaultValue={category}
            id="category-filter"
            name="category"
          >
            <option value="all">All categories</option>
            {categories.map((productCategory) => (
              <option key={productCategory} value={productCategory}>
                {productCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="sort-order">
            Sort by
          </label>
          <select
            className="h-9 w-full rounded-4xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            defaultValue={sortOrder}
            id="sort-order"
            name="sort"
          >
            <option value="default">Featured</option>
            <option value="low-high">Price: low to high</option>
            <option value="high-low">Price: high to low</option>
          </select>
        </div>

        <Button className="rounded-full" type="submit">
          Apply filters
        </Button>
        <Button asChild className="rounded-full" variant="ghost">
          <Link href="/products">Clear</Link>
        </Button>
      </form>

      <section aria-labelledby="product-results-title">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="font-serif text-xl font-medium" id="product-results-title">
            Skincare edit
          </h2>
          <Badge variant="outline">
            {visibleProducts.length} {visibleProducts.length === 1 ? "item" : "items"}
          </Badge>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-3xl border border-dashed border-border px-5 py-12 text-center text-muted-foreground">
            No products match those filters. Try a different search or clear the
            filters.
          </p>
        )}
      </section>
    </main>
  );
}
