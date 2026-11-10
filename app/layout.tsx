import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/shared/components/SiteFooter";
import { SiteHeader } from "@/shared/components/SiteHeader";
import { CartHydration } from "@/cart/components/CartHydration";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopBoard Beauty",
  description: "A thoughtful beauty edit for the rituals that make a day yours.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=null;try{t=localStorage.getItem("shopboard-theme")}catch(e){}var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)})()`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <CartHydration>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </CartHydration>
      </body>
    </html>
  );
}
