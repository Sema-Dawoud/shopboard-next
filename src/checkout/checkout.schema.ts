import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?\d[\d\s()-]{6,19}$/, "Enter a valid phone number.")
    .refine(
      (phone) => phone.replace(/\D/g, "").length >= 7,
      "Enter at least 7 digits.",
    ),
  address: z.string().trim().min(5, "Enter a complete street address."),
  city: z.string().trim().min(2, "Enter your city."),
  postalCode: z.string().trim().min(3, "Enter a valid postal code."),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
