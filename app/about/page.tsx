import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StoreBenefits, ValuesStrip } from "@/home/components/HomePageContent";
import { Button } from "@/shared/components/ui/button";

export const metadata = {
  title: "Our approach | ShopBoard Beauty",
  description:
    "Thoughtful skincare for the small rituals that make an everyday routine feel like your own.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Our approach
          </p>
          <h1 className="max-w-[12ch] font-serif text-5xl font-medium leading-tight tracking-tight sm:text-6xl">
            Make room for you.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            ShopBoard brings together thoughtful skincare for the small rituals
            that make an everyday routine feel like your own. We believe care
            can be simple, considered, and a little bit lovely.
          </p>
          <Button asChild className="mt-7 rounded-full">
            <Link href="/products">
              Explore the collection <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="relative aspect-[1.2] overflow-hidden rounded-[2rem] bg-brand-soft">
          <Image
            alt="ShopBoard skincare essentials arranged on a stone surface"
            className="object-cover"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            src="/products/skincare-duo.jpg"
          />
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <StoreBenefits />
      </div>
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-8 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          A note from ShopBoard
        </p>
        <blockquote className="mt-4 font-serif text-3xl leading-snug sm:text-5xl">
          “Care for your skin. Make room for you.”
        </blockquote>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
          A good routine doesn’t need to be complicated. Find a few everyday
          essentials and let small moments of care be enough.
        </p>
      </section>
      <ValuesStrip />
    </main>
  );
}
