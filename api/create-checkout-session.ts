// POST /api/create-checkout-session
//
// Creates a Stripe Checkout Session for the selected plan and returns its
// hosted URL; the browser then redirects there to pay. Card details are
// entered on Stripe's page and never touch this site.
//
// Memberships become recurring monthly subscriptions; personal
// training is a one-time charge for a single session. The amount is looked up
// here from src/data/content.ts — the client only sends a plan ID, so it
// can't tamper with the price.

import Stripe from 'stripe'
import { pricingTiers } from '../src/data/content.js'

type Body = {
  planId?: string
  customer?: { name?: string; email?: string; phone?: string }
}

export async function POST(request: Request): Promise<Response> {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return Response.json({ error: 'Payments are not configured yet.' }, { status: 500 })
  }
  const stripe = new Stripe(secretKey)

  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const tier = pricingTiers.find((t) => t.id === body.planId)
  if (!tier) {
    return Response.json({ error: 'Unknown plan.' }, { status: 400 })
  }
  const isSession = tier.billing === 'hr'
  const amountCents = tier.price * 100

  // Build the return URL from the forwarded host so it matches whichever
  // deployment the customer is on (production, preview or localhost).
  const fallback = new URL(request.url)
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? fallback.host
  const proto =
    request.headers.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : fallback.protocol.replace(':', ''))
  const origin = `${proto}://${host}`
  const customer = body.customer ?? {}
  const metadata = {
    planId: tier.id,
    planName: tier.name,
    customerName: customer.name ?? '',
    customerPhone: customer.phone ?? '',
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: isSession ? 'payment' : 'subscription',
      customer_email: customer.email || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: amountCents,
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

    return Response.json({ url: session.url })
  } catch (err) {
    console.error('[stripe] failed to create checkout session', err)
    return Response.json({ error: 'Could not start checkout. Please try again.' }, { status: 502 })
  }
}
