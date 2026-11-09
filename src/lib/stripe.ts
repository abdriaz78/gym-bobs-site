// Client side of the Stripe integration. The real work happens in the Vercel
// functions under api/ — this just calls them.
//
// Setup (one-time):
// 1. In the Stripe Dashboard → Developers → API keys, copy a secret key
//    (sk_test_/sk_live_) or a restricted key (rk_test_/rk_live_) with
//    Checkout Sessions write access.
// 2. Set STRIPE_SECRET_KEY in Vercel's project environment variables. It is
//    server-only — never prefix it with VITE_ or it would ship to browsers.
// 3. Payouts go to the bank account set in Stripe Dashboard → Settings →
//    Payouts; nothing about the bank account lives in this codebase.
//
// Local testing: `npx vercel dev` (plain `npm run dev` doesn't run api/).

export type CheckoutInput = {
  planId: string
  customer: {
    name: string
    email: string
    phone: string
  }
}

// Starts Stripe Checkout and navigates away to Stripe's hosted payment page.
// Only returns if something went wrong, with a message to show the user.
export async function redirectToCheckout(input: CheckoutInput): Promise<string> {
  try {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    const data = (await res.json()) as { url?: string; error?: string }
    if (res.ok && data.url) {
      window.location.assign(data.url)
      return ''
    }
    return data.error ?? 'Could not start checkout. Please try again.'
  } catch {
    return 'Could not reach the payment server. Please try again.'
  }
}

export type CheckoutStatus = {
  paid: boolean
  planName: string
  confirmationId: string
}

export type CheckoutReturn = { status: 'success'; sessionId: string } | { status: 'cancelled' }

// Stripe sends the customer back to /?checkout=success&session_id=... or
// /?checkout=cancelled. Reads that once on page load and strips it from the
// URL so a refresh doesn't replay it.
export function readCheckoutReturn(): CheckoutReturn | null {
  const params = new URLSearchParams(window.location.search)
  const status = params.get('checkout')
  const sessionId = params.get('session_id')
  if (status !== 'success' && status !== 'cancelled') return null

  window.history.replaceState(null, '', window.location.pathname + window.location.hash)
  if (status === 'success') return sessionId ? { status, sessionId } : null
  return { status }
}

// The join form's state is lost when the browser leaves for Stripe, so it's
// stashed here and restored if the customer cancels and comes back.
const DRAFT_KEY = 'gymbobs-checkout-draft'

export function saveCheckoutDraft(input: CheckoutInput) {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(input))
  } catch {
    // Storage unavailable (private mode etc.) — they'll just re-enter details.
  }
}

export function takeCheckoutDraft(): CheckoutInput | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY)
    sessionStorage.removeItem(DRAFT_KEY)
    return raw ? (JSON.parse(raw) as CheckoutInput) : null
  } catch {
    return null
  }
}

export async function fetchCheckoutStatus(sessionId: string): Promise<CheckoutStatus | null> {
  try {
    const res = await fetch(`/api/checkout-session?id=${encodeURIComponent(sessionId)}`)
    if (!res.ok) return null
    return (await res.json()) as CheckoutStatus
  } catch {
    return null
  }
}
