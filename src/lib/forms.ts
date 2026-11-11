// Contact and Custom Plan form submissions go two places at once:
//   1. Supabase (via /api/submit-form) — a permanent record you can browse in
//      the Supabase Table Editor. See supabase/schema.sql.
//   2. Formspree (https://formspree.io) — an email to the gym's inbox.
// The form shows success if either one worked.
//
// Formspree setup (one-time):
// 1. Sign up free at formspree.io with the inbox you want submissions sent to.
// 2. Create a new form, copy its endpoint ID (the part after /f/ in the URL
//    Formspree gives you).
// 3. Set VITE_FORMSPREE_FORM_ID to that ID — locally in .env.local, and in
//    Vercel's project environment variables for production.

const FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID as string | undefined

export type FormSubmission =
  | { form: 'contact'; name: string; email: string; message: string }
  | { form: 'plan'; name: string; email: string; plan: string }

const SUBJECTS: Record<FormSubmission['form'], string> = {
  contact: "New message from Gym Bob's website contact form",
  plan: "New custom plan request from Gym Bob's website",
}

export async function submitForm(data: FormSubmission): Promise<boolean> {
  const { form, ...fields } = data
  const [saved, emailed] = await Promise.all([
    saveToDatabase(data),
    submitFormspree({ _subject: SUBJECTS[form], _replyto: data.email, ...fields }),
  ])
  return saved || emailed
}

async function saveToDatabase(data: FormSubmission): Promise<boolean> {
  try {
    const res = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return res.ok
  } catch {
    return false
  }
}

async function submitFormspree(data: Record<string, string>): Promise<boolean> {
  if (!FORM_ID) {
    console.warn('[forms] VITE_FORMSPREE_FORM_ID is not set — email skipped. See src/lib/forms.ts.')
    return false
  }
  try {
    const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return res.ok
  } catch {
    return false
  }
}
