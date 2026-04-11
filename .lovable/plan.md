

# Wholesale / Trade Partner Page

## Overview
Create a full wholesale partner page at `/wholesale` with 11 sections, add it to routing and navigation. Single new file plus minor edits to two existing files.

## Files to create

### `src/pages/Wholesale.tsx` (new, ~700 lines)
The bulk of the work. One large page component containing all 11 sections described in the prompt. Key implementation details:

- **Reuse patterns from Index.tsx**: `RevealSection`, `AnimatedNumber`, `useInView`, `useScrollPosition` — re-implement the same local helpers (they're not shared components, they're defined inline in Index.tsx).
- **Announcement bar**: Marquee with wholesale-specific copy.
- **Nav**: Sticky blurred nav matching Shop.tsx pattern — logo linking home, "Apply Now" hero button that smooth-scrolls to `#apply`, CartDrawer, back arrow.
- **Hero** (`bg-foreground`): Eyebrow + headline + sub + two buttons + three stat pills.
- **Why carry** (`bg-muted`): Three accent-bordered cards.
- **Who it's for** (`bg-background`): Badge pills in flex-wrap + callout card.
- **How it works** (`bg-muted`): Three animated step counters using `AnimatedNumber` + `useInView`.
- **Margin calculator** (`bg-background`): Three controlled inputs (two number, one range slider). Results card with `bg-foreground` showing 4 live-calculated metrics. All values use `Math.round()`. Edge case: fallback to 0 when inputs are falsy.
- **Testimonial** (`bg-muted`): Single placeholder quote card styled like Index.tsx reviews.
- **Application form** (`bg-background`, `id="apply"`): 10 fields using existing `Input`, `Label`, `select`, `textarea`. `useState` for all fields. On submit: log to console + sonner success toast + reset form. Ready for Klaviyo wiring later.
- **FAQ** (`bg-muted`): Radix `Accordion` from `@/components/ui/accordion` with 7 items.
- **Footer**: Import and render existing `Footer` component.

No new dependencies. No new colors. Uses only existing `Button` variants (`hero`, `outline`), existing `Input`, `Label`, `Slider`, `Accordion` components.

## Files to edit

### `src/App.tsx`
- Add `import Wholesale from "./pages/Wholesale"`.
- Add route: `<Route path="/wholesale" element={<Wholesale />} />`.

### `src/pages/Index.tsx`
- In the desktop nav (around line 146), add a `Link` to `/wholesale` labeled "Partners" between Reviews and Shop.
- In the mobile menu (around line 175), add the same "Partners" link.

## Technical notes
- Form uses `htmlFor` on all labels and `id` on all inputs for accessibility.
- All interactive elements get `aria-label` where needed.
- Mobile-first responsive: single column on mobile, multi-column on md+.
- Calculator handles edge cases with `|| 0` fallback on all numeric inputs.
- Slider uses existing `@/components/ui/slider` component.

