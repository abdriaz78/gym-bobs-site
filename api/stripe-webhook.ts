// POST /api/stripe-webhook
//
// Stripe calls this after payments so paying customers land in the Supabase
// `members` table:
//   checkout.session.completed      → insert/update the member
//   customer.subscription.updated   → mirror the subscription status
//   customer.subscription.deleted   → mark as canceled
//
// Setup: Stripe Dashboard → Developers → Webhooks → Add endpoint
//   URL:    https://<your-domain>/api/stripe-webhook
//   Events: the three above
// Then copy the endpoint's signing secret (whsec_...) into STRIPE_WEBHOOK_SECRET.

import type Stripe from 'stripe'
import { pricingTiers } from '../src/data/content.js'
import { getStripe, logStripeError } from './_stripe.js'
import { getSupabase } from './_supabase.js'

function idOf(value: string | { id: string } | null | undefined): string | null {
  if (!value) return null
  return typeof value === 'string' ? value : value.id
}

export async function POST(request: Request): Promise<Response> {
  const stripe = getStripe()
  const supabase = getSupabase()
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim()
  if (!stripe || !supabase || !secret) {
    if (!secret) console.error('[webhook] STRIPE_WEBHOOK_SECRET is not set')
    return Response.json({ error: 'Not configured.' }, { status: 500 })
  }

  // Signature check needs the exact raw body Stripe sent.
  const payload = await request.text()
  const signature = request.headers.get('stripe-signature') ?? ''
  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(payload, signature, secret)
  } catch (err) {
    logStripeError('webhook signature verification failed', err)
    return Response.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const tier = pricingTiers.find((t) => t.id === session.metadata?.planId)
      // Ignore checkouts not created by this site (e.g. Payment Links).
      if (!tier) return Response.json({ received: true })

      const isSubscription = session.mode === 'subscription'
      const row = {
        name: session.metadata?.customerName || session.customer_details?.name || null,
        email: session.customer_details?.email ?? session.customer_email ?? '',
        phone: session.metadata?.customerPhone || session.customer_details?.phone || null,
        plan_id: tier.id,
        plan_name: tier.name,
        billing: isSubscription ? 'subscription' : 'one_time',
        amount_cents: session.amount_total,
        status: isSubscription ? 'active' : session.payment_status,
        stripe_customer_id: idOf(session.customer),
        stripe_subscription_id: idOf(session.subscription),
        stripe_checkout_session_id: session.id,
        updated_at: new Date().toISOString(),
      }
      const { error } = await supabase
        .from('members')
        .upsert(row, { onConflict: 'stripe_checkout_session_id' })
      if (error) throw new Error(`members upsert failed: ${error.message}`)
    } else if (
      event.type === 'customer.subscription.updated' ||
      event.type === 'customer.subscription.deleted'
    ) {
      const sub = event.data.object
      const status = event.type === 'customer.subscription.deleted' ? 'canceled' : sub.status
      const { error } = await supabase
        .from('members')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('stripe_subscription_id', sub.id)
      if (error) throw new Error(`members status update failed: ${error.message}`)
    }
  } catch (err) {
    console.error('[webhook]', event.type, err instanceof Error ? err.message : 'unknown error')
    // 500 makes Stripe retry later.
    return Response.json({ error: 'Failed to process event.' }, { status: 500 })
  }

  return Response.json({ received: true })
}
