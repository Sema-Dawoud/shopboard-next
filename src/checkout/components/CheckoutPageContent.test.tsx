import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckoutPageContent } from "@/checkout/components/CheckoutPageContent";
import { useCartStore } from "@/cart/cart.store";
import type { Product } from "@/products/products.types";

const product: Product = {
  id: 1,
  name: "Hydrating Serum",
  category: "Skincare",
  price: 25,
  description: "A hydrating serum.",
  image: "/images/serum.webp",
  imageAlt: "Hydrating serum bottle",
  inStock: true,
  stock: 5,
  featured: false,
};

describe("checkout form", () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({
      items: [{ id: product.id, quantity: 1 }],
      hasHydrated: true,
    });
  });

  it("shows a validation message when the email address is invalid", async () => {
    const user = userEvent.setup();

    render(<CheckoutPageContent products={[product]} />);

    await user.type(
      screen.getByRole("textbox", { name: "Full name" }),
      "Sara Ahmed",
    );

    await user.type(
      screen.getByRole("textbox", { name: "Email address" }),
      "invalid-email",
    );

    await user.type(
      screen.getByRole("textbox", { name: "Phone number" }),
      "123456789",
    );

    await user.type(
      screen.getByRole("textbox", { name: "Street address" }),
      "123 Main Street",
    );

    await user.type(screen.getByRole("textbox", { name: "City" }), "Istanbul");

    await user.type(
      screen.getByRole("textbox", { name: "Postal code" }),
      "34000",
    );

    await user.click(screen.getByRole("button", { name: /Place mock order/ }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Enter a valid email address.",
    );
  });
});
