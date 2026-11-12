# ShopBoard Beauty

ShopBoard Beauty is a responsive skincare storefront built with Next.js. It includes a product catalogue, product details, a persistent shopping bag, a mock checkout, and an About page.

## Features

- Home page with a hero, categories, featured products, editorial content, store benefits, and brand values.
- Product search, category filtering, sorting, and product detail pages.
- Cart quantity controls, removal, clear-cart action, and stock-aware reconciliation.
- Checkout form with field validation and a mock order confirmation. No payment details are collected and no payment is processed.
- Shared responsive navigation, footer, and accessible Light/Dark theme toggle.

## Technology

- Next.js App Router and React Server Components by default.
- TypeScript with strict checking.
- Tailwind CSS v4 theme tokens in `app/globals.css`.
- shadcn/ui-style shared primitives using the approved Maia preset and Radix base.
- Zustand for cart state, React Hook Form and Zod for checkout validation.
- DummyJSON skincare endpoint for remote products.

## Getting started

Use Node.js and npm, then run from this directory:

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Other available commands:

```bash
npm run lint
npm run build
npm start
```

`npm start` serves the most recent production build.

## Routes

| Route            | Purpose                                             |
| ---------------- | --------------------------------------------------- |
| `/`              | ShopBoard Beauty home page                          |
| `/products`      | Searchable, filterable, sortable product collection |
| `/products/[id]` | Product details                                     |
| `/cart`          | Shopping bag and quantity management                |
| `/checkout`      | Validated mock checkout and order confirmation      |
| `/about`         | ShopBoard Beauty story and approach                 |

## Project structure

```text
app/                       App Router routes, layout, loading, not-found, global stylesheet
src/home/                  Home page sections and content
src/products/              Product types, local data, API mapping, logic, and components
src/cart/                  Cart types, Zustand store, persistence, and UI
src/checkout/               Checkout schema and form UI
src/shared/api/             Shared API client
src/shared/components/      Shared site components and reusable UI primitives
```

Feature code is organized directly under `src`; route entry points and the root layout remain in `app/`.

## Product data and API behavior

Remote products come from DummyJSON's skincare category endpoint through the shared API client in `src/shared/api/client.ts`. The product feature validates and maps the response. ShopBoard's local products are retained and merged with remote products; a local product takes precedence when IDs overlap. If the remote request fails, the catalogue can still use the local products. A product detail request that cannot be fulfilled shows the page's service error state, while an explicit API 404 uses the App Router not-found page.

## Cart and checkout behavior

The cart store persists product IDs and quantities in browser `localStorage`; it does not read browser storage during server rendering. Client hydration restores saved entries, then reconciles them against the currently available products and stock, removing unavailable products and capping quantities to stock. Cart changes are persisted as the user edits the bag.

Checkout uses React Hook Form with a Zod schema for name, email, phone, address, city, and postal code. Submission is a local mock confirmation and clears the cart after the mock submission completes. It does not collect card data, contact a payment processor, or create a real order.

## Theme

The shared header provides Light and Dark modes. Semantic color variables and their Tailwind mappings are defined in `app/globals.css`; the selected theme is saved as `shopboard-theme` in `localStorage`. On first visit, the page follows the system color preference. The root layout applies the saved or system theme before the page is displayed to avoid a flash of the wrong theme.
