// POST /api/create-checkout-session
//
// Creates a Stripe Checkout Session for the selected plan and returns its
// hosted URL; the browser then redirects there to pay. Card details are
// entered on Stripe's page and never touch this site.
//
// Memberships become recurring monthly subscriptions that renew until the
// customer cancels (no cancel_at / trial is set); personal training is a
// one-time charge for a single session. The amount is looked up here from
// src/data/content.ts — the client only sends a plan ID, so it can't tamper
// with the price.
//
// Stripe APIs used: Checkout Sessions (create). Nothing here moves money out
// of the account, so a restricted key without payout/transfer access works.

import { pricingTiers } from '../src/data/content.js'
import { getStripe, logStripeError, returnOrigin } from './_stripe.js'

type Body = {
  planId?: unknown
  customer?: { name?: unknown; email?: unknown; phone?: unknown }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Trims and caps free-text fields; Stripe metadata values max out at 500 chars.
function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request): Promise<Response> {
  const stripe = getStripe()
  if (!stripe) {
    return Response.json({ error: 'Payments are not configured yet.' }, { status: 500 })
  }

  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const tier = pricingTiers.find((t) => t.id === body?.planId)
  if (!tier) {
    return Response.json({ error: 'Unknown plan.' }, { status: 400 })
  }

  const name = clean(body.customer?.name, 100)
  const email = clean(body.customer?.email, 254)
  const phone = clean(body.customer?.phone, 40)
  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const isSession = tier.billing === 'hr'
  const origin = returnOrigin(request)
  const metadata = {
    planId: tier.id,
    planName: tier.name,
    customerName: name,
    customerPhone: phone,
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: isSession ? 'payment' : 'subscription',
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: Math.round(tier.price * 100),
            product_data: { name: tier.name, description: tier.description },
            ...(isSession ? {} : { recurring: { interval: 'month' } }),
          },
        },
      ],
      metadata,
      ...(isSession ? { payment_intent_data: { metadata } } : { subscription_data: { metadata } }),
      success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancelled`,
    })

    if (!session.url) throw new Error('Checkout Session has no URL')
    return Response.json({ url: session.url })
  } catch (err) {
    logStripeError('failed to create checkout session', err)
    return Response.json({ error: 'Could not start checkout. Please try again.' }, { status: 502 })
  }
}
