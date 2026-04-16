# SuperBuys — Vitamins & Supplements Store

Production-ready Next.js e-commerce store with Supabase backend, full auth, and order management.

**Stack:** Next.js 16 · Tailwind CSS v4 · TypeScript · Supabase (Auth + Postgres) · Zustand

---

## Supabase project

| Detail | Value |
|--------|-------|
| Project name | superbuys-vitamins |
| Project ID | dpcspzhavvieqymeoisw |
| Region | EU West (Dublin) |
| URL | https://dpcspzhavvieqymeoisw.supabase.co |
| Dashboard | https://supabase.com/dashboard/project/dpcspzhavvieqymeoisw |

---

## Database schema

| Table | Purpose |
|-------|---------|
| `profiles` | Auto-created on signup — name, phone, avatar |
| `addresses` | Multiple saved delivery addresses per user |
| `products` | 12 vitamin products, prices, images, categories |
| `orders` | Per-customer orders with status tracking |
| `order_items` | Line items with price snapshot at time of purchase |
| `cart_items` | Persisted cart for logged-in users |

All tables have Row Level Security (RLS) enabled.

---

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

`.env.local` is pre-filled with your Supabase URL and anon key.

---

## Deploy to Vercel

```bash
# Push to GitHub
git init && git add . && git commit -m "init superbuys"
gh repo create superbuys --public --source=. --push

# Then: vercel.com → New Project → Import → Deploy
```

**Add environment variables in Vercel:**
```
NEXT_PUBLIC_SUPABASE_URL=https://dpcspzhavvieqymeoisw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Configure Supabase Auth redirect URLs

In your Supabase dashboard → Authentication → URL Configuration:

**Site URL:** `https://your-vercel-domain.vercel.app`

**Redirect URLs (add all):**
```
http://localhost:3000/**
https://your-vercel-domain.vercel.app/**
```

---

## Project structure

```
app/
  layout.tsx              Root layout with AuthProvider
  page.tsx                Shop home page
  account/page.tsx        Order history + profile (protected)
  api/product-image/      Server-side image proxy
components/
  ShopPage.tsx            Main shop with search, filter, auth buttons
  ProductCard.tsx         Product tile — wired to cart store
  CartDrawer.tsx          Slide-in cart with totals + free delivery nudge
  AuthModal.tsx           Sign in / Register modal with tabs
  UserMenu.tsx            Avatar dropdown with account nav
  CategoryBar.tsx         Category pill filter
context/
  AuthContext.tsx         Supabase auth session + helpers
lib/
  supabase/
    client.ts             Browser Supabase client
    server.ts             Server-side Supabase client
    database.types.ts     Full TypeScript types for all tables
  products.ts             Static product list (synced with DB)
  cartStore.ts            Zustand cart store
proxy.ts                  Session refresh proxy (Next.js 16)
```

---

## Extending

### Wire up persistent cart (logged-in users)
In `cartStore.ts`, after `addItem`, call:
```ts
supabase.from('cart_items').upsert({ user_id, product_id, qty })
```

### Place real orders
Create `/api/checkout/route.ts` that:
1. Reads cart from Zustand
2. Inserts into `orders` + `order_items`
3. Clears `cart_items` for the user
4. Returns order ID

### Add Stripe payments
```bash
npm install @stripe/stripe-js stripe
```
Add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to env vars.

### Email confirmations
Enable in Supabase dashboard → Authentication → Email Templates.
Customize the confirmation and welcome emails there.
