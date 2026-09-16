# Gym Bob's of Texas

A cinematic, scroll-driven marketing site for Gym Bob's of Texas — built with
Vite, React, TypeScript, Tailwind CSS, Framer Motion, and GSAP ScrollTrigger.

## Getting started

```bash
npm install
npm run dev       # local dev server, prints a URL (usually http://localhost:5173)
npm run build     # production build, output in dist/
npm run lint      # oxlint
```

## Editing content

Almost all copy — stats, program descriptions, trainer bios, testimonials,
pricing tiers, FAQ, address/hours/social links — lives in one file:

    src/data/content.ts

Edit the values there; components read from it automatically.

## Swapping assets

Images/videos live in `public/media/` and are referenced by plain path
(e.g. `/media/hero-video.mp4`), not JS imports — just drop a new file in with
the same name to replace it, or update the path in the relevant component:

- `logo.png` — nav + footer
- `hero-video.mp4` — Hero background
- `mascot-blue.mp4` / `mascot-blue.png` — Online Coaching spotlight, Gallery
- `mascot-brown.mp4` / `mascot-brown.png` — Trainers accent, Gallery
- `gym-clip-1.mp4`, `gym-clip-2.mp4` — Gallery

Two things flagged as placeholders in `content.ts`:
- **Trainer photos** — currently rendered as initials avatars; drop real
  photos in `public/media/trainers/` and update `Trainers.tsx`.
- **Before/after photos** — testimonials are text-only right now; add image
  slots in `Testimonials.tsx` when you have real transformation photos.

## Membership sign-up flow (currently a mock)

Clicking any "Join Now" button opens `src/components/join/JoinModal.tsx`, a
4-step flow (Plan → Info → Payment → Confirmation). The Payment step is
styled like a real checkout but does **not** talk to Stripe — it calls a
mock function in `src/lib/stripe.ts` that simulates a delay and always
succeeds. No card data is read, validated, or sent anywhere.

**To go live with real Stripe payments:**

1. Create a Stripe account and set up Products/Prices for each membership
   tier (one-time price for day passes, recurring price for memberships).
2. Add a small serverless function (e.g. a Vercel or Netlify function) that
   uses your Stripe **secret** key to create a real Checkout Session server-side.
3. Replace the body of `createCheckoutSession()` in `src/lib/stripe.ts` with
   a call to that endpoint, then redirect to the returned session URL (or
   use `@stripe/stripe-js`'s `redirectToCheckout`).
4. Never put your Stripe secret key in frontend code — only the publishable
   key belongs here.

## Contact form (currently client-only)

The contact form in `src/components/sections/Contact.tsx` shows a "Message
Sent" confirmation on submit but doesn't send anywhere yet. Wire it to a
real endpoint (Formspree, a serverless function, your CRM, etc.) when ready
— the `// TODO` in that file marks the spot.

## Accessibility & performance notes

- Respects `prefers-reduced-motion` (disables GSAP parallax and swaps card
  animations for simple fades) via `src/lib/useReducedMotionSafe.ts`.
- The same hook also simplifies animations below a 768px viewport width.
- Videos use `preload="metadata"` (or `auto` for the hero only) to avoid
  loading all clips upfront.
