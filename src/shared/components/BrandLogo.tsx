import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <Link
      aria-label="ShopBoard Beauty home"
      className={`inline-flex w-fit items-center gap-2.5 text-brand ${className ?? ""}`}
      href="/"
    >
      <Image alt="" height={47} priority src="/tulip-logo.svg" width={39} />
      <span className="grid font-serif text-xl font-medium leading-none">
        ShopBoard
        <span className="mt-1 font-sans text-[0.55rem] font-medium uppercase tracking-[0.27em]">
          beauty
        </span>
      </span>
    </Link>
  );
}
