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

## Membership sign-up flow (Stripe Checkout)

Clicking any "Join Now" button opens `src/components/join/JoinModal.tsx`, a
4-step flow (Plan → Info → Payment → Confirmation). "Pay & Join" calls
`api/create-checkout-session.ts`, which creates a Stripe Checkout Session and
sends the customer to Stripe's hosted page to enter their card. Card data never
touches this site.

- Memberships are monthly subscriptions; personal training is a one-time charge.
- Prices are read on the server from `src/data/content.ts` — the browser only
  sends a plan ID.
- After paying, Stripe redirects to `/?checkout=success&session_id=...` and
  `api/checkout-session.ts` confirms the payment before the welcome screen shows.
  `/?checkout=cancelled` shows a "Payment cancelled" note.

**Setup:** set `STRIPE_SECRET_KEY` in Vercel → Settings → Environment Variables
(`sk_test_`/`rk_test_` for testing, `sk_live_`/`rk_live_` for real payments) and redeploy. Never
give it a `VITE_` prefix. Test locally with `npx vercel dev` — plain
`npm run dev` doesn't run the `api/` functions.

## Database (Supabase)

Form submissions and paying members are saved in a free Supabase Postgres
database. Tables (see `supabase/schema.sql`):

- `contact_messages` — Contact form (also emailed via Formspree)
- `plan_requests` — Custom Plan form (also emailed via Formspree)
- `members` — every completed Stripe Checkout, filled by `api/stripe-webhook.ts`;
  subscription status (active / past_due / canceled) is kept in sync by Stripe.

Only the Vercel functions touch the database (`api/_supabase.ts`), using the
service-role key. Row Level Security is on with no policies, so nothing is
readable from the browser. Browse the data in Supabase → Table Editor.

**Setup:**
1. Create a free project at supabase.com.
2. SQL Editor → paste `supabase/schema.sql` → Run.
3. Project Settings → API: copy the Project URL and the `service_role` key.
4. In Vercel → Settings → Environment Variables set `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY` (never with a `VITE_` prefix).
5. Stripe Dashboard → Developers → Webhooks → Add endpoint
   `https://<your-domain>/api/stripe-webhook` with events
   `checkout.session.completed`, `customer.subscription.updated`,
   `customer.subscription.deleted`. Copy its signing secret into
   `STRIPE_WEBHOOK_SECRET` in Vercel.
6. Redeploy.

## Accessibility & performance notes

- Respects `prefers-reduced-motion` (disables GSAP parallax and swaps card
  animations for simple fades) via `src/lib/useReducedMotionSafe.ts`.
- The same hook also simplifies animations below a 768px viewport width.
- Videos use `preload="metadata"` (or `auto` for the hero only) to avoid
  loading all clips upfront.
