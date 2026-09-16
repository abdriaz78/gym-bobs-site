// Mock payment layer.
//
// This intentionally does NOT talk to Stripe yet. To go live:
// 1. Create a serverless function (e.g. /api/create-checkout-session on
//    Vercel/Netlify) that uses your Stripe SECRET key to create a real
//    Checkout Session for the selected price ID (one-time price for day
//    passes, recurring price for memberships).
// 2. Replace the body of `createCheckoutSession` below with a fetch() to
//    that endpoint, then redirect the browser to the returned session URL
//    (or use @stripe/stripe-js's `redirectToCheckout`).
// 3. Never put your Stripe secret key in frontend code — only the
//    publishable key belongs here.

export type CheckoutInput = {
  planId: string
  planName: string
  priceUsd: number
  billingCycle: 'monthly' | 'annual'
  customer: {
    name: string
    email: string
    phone: string
  }
}

export type CheckoutResult = {
  success: true
  confirmationId: string
}

export async function createCheckoutSession(input: CheckoutInput): Promise<CheckoutResult> {
  // Simulated network + processing delay so the UI feels real.
  await new Promise((resolve) => setTimeout(resolve, 1200))

  const confirmationId = `GBT-${Date.now().toString(36).toUpperCase()}`

  console.info('[mock stripe] would create checkout session for', input)

  return { success: true, confirmationId }
}
