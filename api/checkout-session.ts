// GET /api/checkout-session?id=cs_...
//
// Called by the site after Stripe redirects back, to confirm the session was
// actually paid before showing the "Welcome" screen. Returns only what the
// confirmation screen needs.

import Stripe from 'stripe'

export async function GET(request: Request): Promise<Response> {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return Response.json({ error: 'Payments are not configured yet.' }, { status: 500 })
  }

  const id = new URL(request.url).searchParams.get('id')
  if (!id || !id.startsWith('cs_')) {
    return Response.json({ error: 'Missing session id.' }, { status: 400 })
  }

  try {
    const session = await new Stripe(secretKey).checkout.sessions.retrieve(id)
    return Response.json({
      paid: session.status === 'complete' && session.payment_status !== 'unpaid',
      planName: session.metadata?.planName ?? '',
      confirmationId: id.slice(-8).toUpperCase(),
    })
  } catch {
    return Response.json({ error: 'Session not found.' }, { status: 404 })
  }
}
