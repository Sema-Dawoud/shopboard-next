import { Card } from "@/shared/components/ui/card";

export default function ProductsLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading products"
      className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-16"
    >
      <div className="mb-8 grid gap-3">
        <div className="h-3 w-32 animate-pulse rounded-full bg-secondary" />
        <div className="h-10 w-full max-w-lg animate-pulse rounded-2xl bg-secondary" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <Card className="gap-4 overflow-hidden rounded-3xl p-4" key={index}>
            <div className="aspect-[4/3] animate-pulse rounded-2xl bg-secondary" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-secondary" />
            <div className="h-4 w-full animate-pulse rounded bg-secondary" />
          </Card>
        ))}
      </div>
    </main>
  );
}
