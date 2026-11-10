import { ProductCollection } from "@/products/components/ProductCollection";
import { getProductCatalog } from "@/products/products.api";
import type {
  ProductCategoryFilter,
  ProductSortOrder,
} from "@/products/products.types";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getSingleValue(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

function parseCategory(value: string): ProductCategoryFilter {
  return value === "Skincare" ? "Skincare" : "all";
}

function parseSortOrder(value: string): ProductSortOrder {
  if (value === "low-high" || value === "high-low") {
    return value;
  }

  return "default";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const catalog = await getProductCatalog();

  return (
    <ProductCollection
      category={parseCategory(getSingleValue(params.category))}
      hasApiError={catalog.hasApiError}
      products={catalog.products}
      searchTerm={getSingleValue(params.q)}
      sortOrder={parseSortOrder(getSingleValue(params.sort))}
    />
  );
}
