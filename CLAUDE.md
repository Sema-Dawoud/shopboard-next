# ShopBoard Beauty UI and implementation rules

Use these project conventions when changing the storefront. Keep this document aligned with the actual tokens and shared components in the codebase.

## Design system

- Use the semantic CSS variables in `app/globals.css` for surfaces and text: `background`, `foreground`, `card`, `card-foreground`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, and `ring`. Use the `brand`, `brand-foreground`, `brand-soft`, and `brand-warm` tokens for ShopBoard accents.
- The light palette is warm ivory (`#faf7f4`), deep green (`#214437`), sage (`#e4e8d9`), warm muted surface (`#f1ebe5`), and soft border (`#e7e0da`). Dark mode overrides the same semantic tokens, with deep green-gray surfaces (`#171d19`, `#202923`) and light foreground (`#f4f0e9`). Use semantic utilities such as `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `bg-brand`, and `border-border`; do not hard-code another color palette in components.
- The sans font is Geist (`--font-geist-sans`) and the mono font is Geist Mono (`--font-geist-mono`), loaded in `app/layout.tsx`. Serif display text uses Tailwind's serif stack, explicitly defined by `--font-serif` in `app/globals.css`. Preserve these font choices.
- The base radius is `--radius: 0.625rem`; the theme derives `sm`, `md`, `lg`, and `xl` radius tokens from it. Existing page design also uses Tailwind rounded utilities for larger cards and pills. Use Tailwind spacing utilities and the existing responsive spacing patterns rather than adding custom CSS values without a design need.

## Styling and shared components

- Style with Tailwind classes only. `app/globals.css` is the sole project CSS file; do not add CSS, Sass, CSS modules, or styled-component files.
- Reuse components in `src/shared/components/ui/` and shared site components in `src/shared/components/`. Do not copy a Button, Input, Card, Badge, Dialog, header, or footer implementation into a feature.
- Keep UI component props typed. Use the existing component variants and sizes; extend variants through the shared component API when a genuine reusable need exists.
- Build feature-specific pieces in their feature folder and compose shared primitives instead of repeating their styles.

## Responsive design and accessibility

- Design for narrow screens first, then use the existing Tailwind breakpoints (`sm`, `md`, `lg`, and others where needed) for larger layouts. Ensure navigation, product grids, forms, and actions fit and remain operable at mobile widths.
- Use semantic landmarks and elements, a logical heading hierarchy, descriptive link text, associated form labels, and accessible names for icon-only controls.
- Preserve visible keyboard focus, keyboard operation, and adequate contrast in both themes. Mark decorative icons/images as hidden from assistive technology and provide useful alternative text for informative images.
- For menus and dialogs, expose state and relationships with accessible attributes and support expected keyboard behavior.

## Architecture and rendering

- Keep the Next.js App Router at the repository root in `app/`. Route files should compose feature code rather than duplicate it.
- Organize feature code directly under `src/home/`, `src/products/`, `src/cart/`, `src/checkout/`, and `src/shared/`; do not add a generic `features/` wrapper.
- Pages and layouts are Server Components by default. Use a Client Component only when browser APIs, state, effects, or event handlers require it, and keep that client boundary as small as practical.
- Never read `localStorage`, `window`, or other browser-only APIs during server rendering. Keep data access and product logic in their feature modules and use the single shared API client under `src/shared/api/`.
- Use `next/link` for internal navigation and Next.js image handling for storefront images. Follow the local Next.js documentation in `node_modules/next/dist/docs/` when an API or convention is unfamiliar.
