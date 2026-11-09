// GET /api/checkout-session?id=cs_...
//
// Called by the site after Stripe redirects back, to confirm the session was
// actually paid before showing the "Welcome" screen. Returns only what the
// confirmation screen needs — no customer email, name, phone or amounts.
//
// Stripe APIs used: Checkout Sessions (read).

import { pricingTiers } from '../src/data/content.js'
import { getStripe, logStripeError } from './_stripe.js'

const SESSION_ID_PATTERN = /^cs_(test|live)_[A-Za-z0-9]{10,200}$/

export async function GET(request: Request): Promise<Response> {
  const stripe = getStripe()
  if (!stripe) {
    return Response.json({ error: 'Payments are not configured yet.' }, { status: 500 })
  }

  const id = new URL(request.url).searchParams.get('id') ?? ''
  if (!SESSION_ID_PATTERN.test(id)) {
    return Response.json({ error: 'Missing session id.' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(id)
    // Only report on sessions this site created (other Stripe checkouts on the
    // same account, e.g. Payment Links, don't carry one of our plan IDs).
    const tier = pricingTiers.find((t) => t.id === session.metadata?.planId)
    if (!tier) {
      return Response.json({ error: 'Session not found.' }, { status: 404 })
    }
    return Response.json(
      {
        paid: session.status === 'complete' && session.payment_status !== 'unpaid',
        planName: tier.name,
        confirmationId: id.slice(-8).toUpperCase(),
      },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  } catch (err) {
    logStripeError('failed to retrieve checkout session', err)
    return Response.json({ error: 'Session not found.' }, { status: 404 })
  }
}
