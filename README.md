# VitaShop — Vitamins & Supplements Store

A production-ready Next.js e-commerce one-pager for South African vitamins and supplements.

**Stack:** Next.js 15 · Tailwind CSS v4 · TypeScript · Open Food Facts API (live product images by SA barcode)

---

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel

```bash
# Option A — CLI
npm i -g vercel && vercel

# Option B — GitHub → Vercel dashboard
git init && git add . && git commit -m "init"
gh repo create vitashop --public --source=. --push
# Then: vercel.com → New Project → Import → Deploy
```

No environment variables required for the base deployment.

---

## Project structure

```
app/
  layout.tsx        Root layout + SEO metadata
  page.tsx          Entry point → <ShopPage />
  globals.css       Tailwind v4 + base styles
components/
  ShopPage.tsx      Main page: search, filter, responsive grid
  ProductCard.tsx   Product tile with badge, price, add-to-cart button
  CategoryBar.tsx   Category pill filter bar
  ProductImage.tsx  Live image fetch from Open Food Facts API + fallback
lib/
  products.ts       All 12 products with SA barcodes, prices, categories
  utils.ts          Barcode → Open Food Facts image path utility
next.config.ts      Image domain whitelist for openfoodfacts.org
```

---

## Extending

### Add a product
Edit `lib/products.ts` — add to the `products` array. Use the EAN-13 barcode from the pack or Dis-Chem listing.

### Connect a cart
Replace `cartCount` state in `ShopPage.tsx` with Zustand or React Context.

### Product detail pages
Create `app/product/[id]/page.tsx` and route card clicks to `/product/${product.id}`.

### Stripe checkout
Install `@stripe/stripe-js` + `stripe`, add `/api/checkout/route.ts`, wire cart total to it.

### Supabase backend
```bash
npm install @supabase/supabase-js
```
Set env vars:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## Image licence
Product images from [Open Food Facts](https://world.openfoodfacts.org/) — [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)
