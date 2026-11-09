// Shared helpers for the Stripe functions. Vercel doesn't turn files starting
// with "_" into endpoints, so this is never reachable as /api/_stripe.

import Stripe from 'stripe'

// Secret (sk_) or restricted (rk_) keys, test or live. Publishable keys (pk_)
// can't create Checkout Sessions, so they're rejected with a clear log line.
const KEY_PATTERN = /^(sk|rk)_(test|live)_[A-Za-z0-9]+$/

let cached: { stripe: Stripe; mode: 'test' | 'live' } | null = null

// Returns a Stripe client, or null if STRIPE_SECRET_KEY is missing/invalid.
// Never logs or returns the key itself — only whether it's test or live.
export function getStripe(): Stripe | null {
  if (cached) return cached.stripe

  const key = process.env.STRIPE_SECRET_KEY?.trim()
  const match = key ? KEY_PATTERN.exec(key) : null
  if (!key || !match) {
    console.error(
      key
        ? '[stripe] STRIPE_SECRET_KEY is not a secret (sk_) or restricted (rk_) key'
        : '[stripe] STRIPE_SECRET_KEY is not set',
    )
    return null
  }

  const mode = match[2] as 'test' | 'live'
  console.info(`[stripe] using ${mode} mode`)
  cached = { stripe: new Stripe(key), mode }
  return cached.stripe
}

// Logs a Stripe/API failure without dumping the whole error object.
export function logStripeError(context: string, err: unknown) {
  if (err instanceof Stripe.errors.StripeError) {
    console.error(`[stripe] ${context}:`, {
      type: err.type,
      code: err.code,
      message: err.message,
      requestId: err.requestId,
    })
  } else {
    console.error(`[stripe] ${context}:`, err instanceof Error ? err.message : 'unknown error')
  }
}

// The origin Stripe sends customers back to after checkout. Only hosts that
// belong to this project are trusted; anything else (e.g. a forged Host or
// X-Forwarded-Host header) falls back to the production domain, so a checkout
// link can never redirect a paying customer to someone else's site.
export function returnOrigin(request: Request): string {
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const allowed = new Set(
    [
      production,
      production && !production.startsWith('www.') ? `www.${production}` : undefined,
      process.env.VERCEL_URL,
      process.env.VERCEL_BRANCH_URL,
    ].filter(Boolean),
  )

  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? ''
  if (/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host) && process.env.VERCEL_ENV !== 'production') {
    return `http://${host}`
  }
  if (allowed.has(host)) return `https://${host}`
  if (production) return `https://${production}`
  return new URL(request.url).origin
}
