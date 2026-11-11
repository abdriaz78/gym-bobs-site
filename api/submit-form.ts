// POST /api/submit-form
//
// Saves a Contact or Custom Plan form submission to Supabase. Body:
//   { "form": "contact", "name", "email", "message" }
//   { "form": "plan",    "name", "email", "plan" }

import { getSupabase } from './_supabase.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request): Promise<Response> {
  const supabase = getSupabase()
  if (!supabase) {
    return Response.json({ error: 'Database is not configured yet.' }, { status: 500 })
  }

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const name = clean(body.name, 100)
  const email = clean(body.email, 254)
  if (!name || !EMAIL_PATTERN.test(email)) {
    return Response.json({ error: 'Please enter your name and a valid email.' }, { status: 400 })
  }

  let table: string
  let row: Record<string, string>
  if (body.form === 'contact') {
    const message = clean(body.message, 5000)
    if (!message) return Response.json({ error: 'Message is empty.' }, { status: 400 })
    table = 'contact_messages'
    row = { name, email, message }
  } else if (body.form === 'plan') {
    const plan = clean(body.plan, 5000)
    if (!plan) return Response.json({ error: 'Plan details are empty.' }, { status: 400 })
    table = 'plan_requests'
    row = { name, email, plan }
  } else {
    return Response.json({ error: 'Unknown form.' }, { status: 400 })
  }

  const { error } = await supabase.from(table).insert(row)
  if (error) {
    console.error(`[supabase] insert into ${table} failed:`, error.message)
    return Response.json({ error: 'Could not save. Please try again.' }, { status: 502 })
  }
  return Response.json({ ok: true })
}
