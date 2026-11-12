import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Leaf,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { ProductCard } from "@/products/components/ProductCard";
import type { Product } from "@/products/products.types";

interface HomePageContentProps {
  products: Product[];
}

export function HomePageContent({ products }: HomePageContentProps) {
  const featuredProducts = [
    ...products.filter((product) => product.featured),
    ...products.filter((product) => !product.featured),
  ].slice(0, 4);

  return (
    <main>
      <section
        aria-labelledby="hero-title"
        className="relative isolate overflow-hidden bg-brand-soft/50"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-8 sm:py-16 lg:min-h-[610px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-20">
          <div className="relative z-10 max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Skincare &amp; little rituals
            </p>
            <h1
              className="max-w-[11ch] font-serif text-5xl font-medium leading-[1.03] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
              id="hero-title"
            >
              Thoughtful care. Beautiful{" "}
              <em className="text-brand">every day.</em>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Considered skincare for your everyday rituals.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Button asChild className="h-11 rounded-full px-6" size="lg">
                <Link href="/products">Shop the collection</Link>
              </Button>
              <Link
                className="inline-flex items-center gap-1 text-sm font-medium text-brand underline-offset-4 hover:underline"
                href="#categories"
              >
                Explore categories{" "}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-background/75 px-4 py-2 text-sm text-brand">
              <Leaf aria-hidden="true" className="size-4" />
              Thoughtful skincare
            </div>
          </div>

          <div className="relative mx-auto aspect-[0.92] w-full max-w-[600px] overflow-hidden rounded-[2rem] bg-brand-warm/50 shadow-sm sm:aspect-[1.05] lg:aspect-[0.9]">
            <Image
              alt="A gentle facial cleanser and hydrating serum arranged in warm natural light"
              className="object-cover"
              fill
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 55vw"
              src="/products/skincare-hero.jpg"
            />
            <div className="absolute bottom-4 right-4 rounded-xl border border-white/50 bg-background/90 px-4 py-3 text-[10px] font-semibold leading-relaxed tracking-[0.2em] text-brand shadow-sm">
              SHOPBOARD
              <br />
              BEAUTY
            </div>
          </div>
        </div>
      </section>

      <StoreBenefits />

      <section
        aria-labelledby="categories-title"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-20"
        id="categories"
      >
        <SectionHeading
          eyebrow="Find your feel-good"
          title="A good place to begin."
          description="Skincare, thoughtfully gathered for your everyday."
        />
        <Link
          className="group relative mt-8 block min-h-72 overflow-hidden rounded-3xl bg-brand-soft sm:min-h-96"
          href="/products?category=Skincare"
        >
          <Image
            alt="Skincare oils and creams on a stone counter"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            fill
            sizes="(max-width: 768px) 100vw, 90vw"
            src="/products/skincare-duo.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 text-background sm:p-9">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/80">
                01 / Care
              </p>
              <h3 className="mt-2 font-serif text-3xl sm:text-4xl">Skincare</h3>
            </div>
            <span className="grid size-11 place-items-center rounded-full border border-background/60 transition-colors group-hover:bg-background group-hover:text-brand">
              <ArrowUpRight aria-hidden="true" className="size-5" />
              <span className="sr-only">Browse skincare</span>
            </span>
          </div>
        </Link>
      </section>

      <section
        aria-labelledby="favorites-title"
        className="bg-card px-4 py-14 sm:px-8 sm:py-20"
        id="favorites"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The everyday edit"
            title="Shop our favorites."
            action={
              <Link
                className="inline-flex items-center gap-1 text-sm font-medium text-brand underline-offset-4 hover:underline"
                href="/products"
              >
                View all products{" "}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            }
          />
          {featuredProducts.length ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground">
              Our favorites are taking a little moment. Please check back soon.
            </p>
          )}
        </div>
      </section>

      <section
        aria-label="A note from ShopBoard"
        className="mx-auto grid max-w-7xl gap-0 overflow-hidden px-4 py-14 sm:px-8 sm:py-20 md:grid-cols-[1fr_0.85fr_1fr]"
      >
        <div className="flex flex-col justify-center rounded-t-3xl bg-brand-soft p-7 sm:p-10 md:rounded-l-3xl md:rounded-tr-none">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            The ShopBoard circle
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight sm:text-4xl">
            Make yourself at home.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Discover a considered edit of skincare and small rituals made to
            feel like your own.
          </p>
          <Button asChild className="mt-6 w-fit rounded-full" variant="outline">
            <Link href="/about">Our approach</Link>
          </Button>
        </div>
        <div className="relative min-h-64 bg-brand-warm/50 sm:min-h-80">
          <Image
            alt="ShopBoard skincare essentials arranged on a stone surface"
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
            src="/products/skincare-duo.jpg"
          />
        </div>
        <blockquote className="flex min-h-64 flex-col justify-center rounded-b-3xl bg-brand p-7 text-background sm:p-10 md:rounded-r-3xl md:rounded-bl-none">
          <span
            aria-hidden="true"
            className="font-serif text-5xl leading-none text-brand-warm"
          >
            “
          </span>
          <p className="font-serif text-2xl leading-snug sm:text-3xl">
            Care for your skin. Make room for you.
          </p>
          <cite className="mt-6 text-[10px] font-semibold not-italic tracking-[0.2em] text-background/70">
            A NOTE FROM SHOPBOARD
          </cite>
        </blockquote>
      </section>

      <ValuesStrip />
    </main>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </header>
  );
}

export function StoreBenefits() {
  const benefits = [
    {
      icon: PackageCheck,
      title: "A thoughtful edit",
      copy: "Skincare for your everyday rituals.",
    },
    {
      icon: Sparkles,
      title: "Easy to explore",
      copy: "Find your next favorite with ease.",
    },
    {
      icon: Leaf,
      title: "Care, considered",
      copy: "A little more intention in every day.",
    },
    {
      icon: Check,
      title: "Made for real life",
      copy: "Simple essentials for your routine.",
    },
  ];

  return (
    <section
      aria-labelledby="store-benefits-title"
      className="relative z-10 mx-auto -mt-4 grid max-w-6xl grid-cols-2 overflow-hidden rounded-3xl border border-border bg-background p-3 shadow-sm sm:p-5 lg:grid-cols-4"
      id="our-approach"
    >
      <h2 className="sr-only" id="store-benefits-title">
        The ShopBoard difference
      </h2>
      {benefits.map(({ icon: Icon, title, copy }, index) => (
        <article
          className={`flex min-h-32 flex-col justify-center px-3 py-4 text-center sm:px-5 ${index > 0 ? "border-l border-border" : ""} ${index > 1 ? "border-t border-border lg:border-t-0" : ""}`}
          key={title}
        >
          <Icon aria-hidden="true" className="mx-auto mb-2 size-5 text-brand" />
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {copy}
          </p>
        </article>
      ))}
    </section>
  );
}

export function ValuesStrip() {
  return (
    <section
      aria-label="ShopBoard beauty collection"
      className="mx-auto flex max-w-7xl flex-col gap-4 px-4 pb-14 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pb-20"
    >
      <p className="font-serif text-xl leading-snug sm:text-2xl">
        Good for you.
        <br />
        Good for your everyday.
      </p>
      <div className="flex flex-wrap gap-2">
        {["Skincare", "A thoughtful edit", "Made for every day"].map(
          (value) => (
            <Badge
              className="rounded-full px-3 py-1"
              key={value}
              variant="secondary"
            >
              <Check aria-hidden="true" /> {value}
            </Badge>
          ),
        )}
      </div>
    </section>
  );
}
