

## Plan: Integrate Shopify Store into Farmer's Tan Website

### What This Does
Adds real Shopify e-commerce functionality to your existing site -- product listings pulled from your Shopify store, a shopping cart, and checkout. Your existing landing page sections (Hero, Benefits, Testimonials, etc.) stay intact. We add a Shop section that loads real products from Shopify.

### Files to Create

1. **`src/lib/shopify.ts`** -- Storefront API config, helper function, GraphQL queries, cart mutations, and TypeScript types. Contains your store domain and storefront token.

2. **`src/stores/cartStore.ts`** -- Zustand-based cart state management with persistent localStorage. Handles add/remove/update items with real-time Shopify cart sync.

3. **`src/hooks/useCartSync.ts`** -- Hook that syncs cart state when returning from checkout or switching tabs.

4. **`src/components/CartDrawer.tsx`** -- Slide-out cart panel showing items, quantities, totals, and a "Checkout with Shopify" button.

5. **`src/components/ShopSection.tsx`** -- Product grid that fetches products from Shopify Storefront API. Shows "No products found" if store is empty. Each card has image, title, price, and "Add to Cart" button.

6. **`src/pages/ProductDetail.tsx`** -- Individual product page at `/product/:handle` with images, description, variant selection, and add-to-cart.

### Files to Modify

7. **`src/pages/Index.tsx`** -- Add `<ShopSection />` between ProductShowcase and ProblemSolutions.

8. **`src/components/Header.tsx`** -- Add CartDrawer next to the "Buy Now" button. Add "Shop" nav link.

9. **`src/App.tsx`** -- Add `useCartSync` hook. Add `/product/:handle` route.

### Dependencies to Install
- `zustand` (cart state management)

### After Implementation
Your store currently has no products. You can create one by telling me the product name, description, price, and providing an image. For example: "Create a product called Farmer's Tan Sunless Tanner, priced at $39.99" and I'll add it to your Shopify store.

### Technical Details
- Storefront API version: 2025-07
- Store domain: `mind-forge-logic-o4pfq.myshopify.com`
- Cart checkout uses Shopify's `cartCreate` mutation (no manual URLs)
- Checkout opens in new tab with `channel=online_store` parameter
- Cart persists in localStorage across sessions

