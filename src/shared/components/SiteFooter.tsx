import Link from "next/link";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { BrandLogo } from "@/shared/components/BrandLogo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-brand-soft px-4 py-10 text-foreground md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 pb-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <BrandLogo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A thoughtful beauty edit for the rituals that make a day yours.
          </p>
        </div>

        <nav aria-label="Explore" className="grid content-start gap-2 text-sm">
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            Explore
          </h2>
          <Link className="hover:text-brand" href="/#categories">
            Categories
          </Link>
          <Link className="hover:text-brand" href="/#favorites">
            The beauty edit
          </Link>
          <Link className="hover:text-brand" href="/about">
            Our approach
          </Link>
        </nav>

        <nav
          aria-label="Your ShopBoard"
          className="grid content-start gap-2 text-sm"
        >
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            Your ShopBoard
          </h2>
          <Link className="hover:text-brand" href="/cart">
            Shopping bag
          </Link>
          <Link className="hover:text-brand" href="/checkout">
            Checkout
          </Link>
          <Link className="hover:text-brand" href="/products">
            Find a product
          </Link>
        </nav>

        <Card className="gap-3 rounded-3xl border-brand/10 bg-background/70 py-5 shadow-none">
          <CardHeader className="gap-2 px-5">
            <Badge className="w-fit" variant="secondary">
              Take a moment
            </Badge>
            <CardTitle className="font-serif text-xl font-medium">
              Care for your skin.
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 text-sm text-muted-foreground">
            Make room for you.
          </CardContent>
        </Card>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-brand/15 pt-4 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <span>© 2026 ShopBoard Beauty</span>
        <span>Made for your everyday.</span>
      </div>
    </footer>
  );
}
