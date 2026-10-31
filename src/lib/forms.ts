// Thin wrapper around Formspree (https://formspree.io) so the Contact and
// Custom Plan forms actually deliver email instead of just mocking success.
//
// Setup (one-time):
// 1. Sign up free at formspree.io with the inbox you want submissions sent to.
// 2. Create a new form, copy its endpoint ID (the part after /f/ in the URL
//    Formspree gives you).
// 3. Set VITE_FORMSPREE_FORM_ID to that ID — locally in .env.local, and in
//    Vercel's project environment variables for production.

const FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID as string | undefined

export async function submitFormspree(data: Record<string, string>): Promise<boolean> {
  if (!FORM_ID) {
    console.warn(
      '[forms] VITE_FORMSPREE_FORM_ID is not set — form submission skipped. See src/lib/forms.ts.',
    )
    return false
  }

  const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  return res.ok
}
