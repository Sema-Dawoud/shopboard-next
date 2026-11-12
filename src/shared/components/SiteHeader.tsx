"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { useCartStore } from "@/cart/cart.store";
import { Button } from "@/shared/components/ui/button";
import { BrandLogo } from "@/shared/components/BrandLogo";

function subscribeToTheme(callback: () => void) {
  window.addEventListener("shopboard-theme-change", callback);
  return () => window.removeEventListener("shopboard-theme-change", callback);
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerThemeSnapshot() {
  return false;
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDarkMode = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleTheme() {
    const nextTheme = isDarkMode ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.dispatchEvent(new Event("shopboard-theme-change"));
    try {
      window.localStorage.setItem("shopboard-theme", nextTheme);
    } catch {
      // The current page theme still changes if browser storage is unavailable.
    }
  }

  return (
    <>
      <div className="bg-foreground px-4 py-1.5 text-center text-xs font-medium tracking-wide text-background">
        <p>A little more care in every day.</p>
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <BrandLogo />

          <nav
            aria-label="Main navigation"
            className={`${isMenuOpen ? "grid" : "hidden"} absolute top-full right-0 left-0 gap-1 border-b border-border bg-background p-4 shadow-sm md:static md:flex md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
            id="primary-navigation"
          >
            <Link
              className="rounded-full px-3 py-2 text-sm transition-colors hover:bg-brand-soft hover:text-brand"
              href="/products"
              onClick={closeMenu}
            >
              Shop all
            </Link>
            <Link
              className="rounded-full px-3 py-2 text-sm transition-colors hover:bg-brand-soft hover:text-brand"
              href="/#favorites"
              onClick={closeMenu}
            >
              Featured
            </Link>
            <Link
              className="rounded-full px-3 py-2 text-sm transition-colors hover:bg-brand-soft hover:text-brand"
              href="/#categories"
              onClick={closeMenu}
            >
              Categories
            </Link>
            <Link
              className="rounded-full px-3 py-2 text-sm transition-colors hover:bg-brand-soft hover:text-brand"
              href="/about"
              onClick={closeMenu}
            >
              Our approach
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              className="rounded-full"
              onClick={toggleTheme}
              size="icon"
              title={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              variant="outline"
            >
              {isDarkMode ? (
                <Sun aria-hidden="true" />
              ) : (
                <Moon aria-hidden="true" />
              )}
            </Button>
            <Button asChild className="rounded-full" variant="outline">
              <Link
                aria-label={`Shopping bag, ${itemCount} items`}
                href="/cart"
              >
                <span className="hidden md:inline">Shopping bag</span>
                <span className="ml-1 grid min-w-5 place-items-center rounded-full bg-brand px-1 text-xs leading-5 text-brand-foreground">
                  {itemCount}
                </span>
              </Link>
            </Button>
            <Button
              aria-controls="primary-navigation"
              aria-expanded={isMenuOpen}
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className="md:hidden"
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              size="icon"
              variant="outline"
            >
              <svg
                aria-hidden="true"
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    d="m6 6 12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.8"
                  />
                ) : (
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.8"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
