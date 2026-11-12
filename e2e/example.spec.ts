import { expect, test } from "@playwright/test";

test("completes checkout and clears the bag after a valid order", async ({
  page,
}) => {
  await page.goto("/products");

  const addToBagButton = page
    .getByRole("button", { name: /^Add .+ to bag$/ })
    .first();

  await expect(addToBagButton).toBeEnabled();
  await addToBagButton.click();

  await page.goto("/checkout");

  await page.getByRole("textbox", { name: "Full name" }).fill("Sara Ahmed");
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("sara@example.com");
  await page.getByRole("textbox", { name: "Phone number" }).fill("123456789");
  await page
    .getByRole("textbox", { name: "Street address" })
    .fill("123 Main Street");
  await page.getByRole("textbox", { name: "City" }).fill("Istanbul");
  await page.getByRole("textbox", { name: "Postal code" }).fill("34000");

  await page.getByRole("button", { name: /Place mock order/ }).click();

  await expect(
    page.getByRole("heading", { name: "Thank you for your order." }),
  ).toBeVisible();

  await expect(page.getByText("Your bag is now clear.")).toBeVisible();
});
