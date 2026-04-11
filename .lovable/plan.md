

# Dynamic Landing Page Overhaul

## What We're Doing

Taking the current landing page from "solid but static" to a high-energy, scroll-driven experience that grabs the target demographic (25-45 year old guys) and keeps them engaged. Every section gets interaction, motion, and visual punch -- all within the existing color palette and brand voice.

## Key Changes

### 1. Scroll-triggered section reveals (Intersection Observer)
Every section fades/slides into view as the user scrolls. No Framer Motion dependency needed -- we'll use a lightweight custom `useInView` hook with CSS transitions. Staggered children within each section for a cascading effect.

### 2. Animated announcement bar
Horizontal scrolling marquee effect on the announcement bar text, looping continuously. Catches the eye immediately.

### 3. Nav improvements
- Add the CartDrawer to the nav (it exists but isn't used on Index)
- Backdrop blur on the sticky nav for a polished glassmorphism feel
- Active section highlighting as user scrolls (using Intersection Observer)

### 4. Hero section upgrades
- Animated counter/typing effect on the tagline
- Parallax-style background movement on the gradient shift (subtle translateY based on scroll position)
- Pulsing CTA button with a subtle glow ring animation

### 5. Problem section -- interactive comparison cards
- Cards flip or slide on hover/tap to reveal more detail
- "THE OLD WAY" card gets a subtle red-tinted overlay; "THE DUDE TAN WAY" gets the accent gold glow
- Hover scale on cards

### 6. How It Works -- animated step counter
- Numbers count up from 00 to their value when scrolled into view
- Each step staggers in from below with increasing delay
- Vertical dividers animate in height from 0 to full

### 7. Features section -- hover interactions
- Cards lift on hover with a subtle accent border glow
- Icon/emoji animations on hover (slight bounce)

### 8. Reviews section -- auto-rotating carousel on mobile
- On mobile: horizontal swipeable carousel instead of stacked cards
- Stars animate in sequentially when scrolled into view
- Quote marks styled larger and decorative

### 9. Buy CTA section -- high-energy treatment
- Price has a subtle pulse animation
- "ADD TO CART" button gets a shimmer sweep effect across it
- Urgency micro-copy with a subtle fade-in below the button
- Decorative accent lines/dividers flanking the headline

### 10. Footer -- subtle upgrades
- Social links get hover icon animations
- Decorative divider line with accent color gradient

### 11. Fix stale components
- Update `Footer.tsx` from "Farmer's Tan" branding to "Dude Tan" (it's used on ProductDetail page)
- Update `Header.tsx` references from "Farmer's Tan" to "Dude Tan" and use correct logo
- Update `Newsletter.tsx`, `Testimonials.tsx`, `AboutTeaser.tsx`, `ProductShowcase.tsx`, `ProductBenefits.tsx`, `ProblemSolutions.tsx` copy to match Dude Tan voice (these are legacy components -- either update or remove if unused)

## Technical Approach

### New files:
- `src/hooks/useInView.ts` -- Intersection Observer hook for scroll-triggered animations
- `src/hooks/useScrollPosition.ts` -- lightweight scroll Y tracker for parallax

### Modified files:
- `src/pages/Index.tsx` -- Major rewrite: add scroll animations, marquee bar, enhanced interactions, CartDrawer in nav, active nav state
- `src/index.css` -- Add new keyframes: `marquee`, `shimmer-btn`, `count-up`, `glow-pulse`; add utility classes for scroll-reveal transitions
- `src/components/Header.tsx` -- Update to Dude Tan branding
- `src/components/Footer.tsx` -- Update to Dude Tan branding
- `src/components/Newsletter.tsx` -- Update copy to Dude Tan voice

### No new colors or fonts. All animations use existing accent/primary/foreground values. All motion is purposeful per workspace rules -- each animation serves engagement, not decoration.

