import { useState, type FormEvent } from 'react'
import { Lock } from 'lucide-react'
import { Button } from '../ui/Button'

type Props = {
  onBack: () => void
  onSubmit: () => void
  submitting: boolean
}

// Purely presentational — styled like a real checkout form, but no card
// data is read, validated, or transmitted anywhere. See src/lib/stripe.ts
// for what to wire up when going live.
export function PaymentStep({ onBack, onSubmit, submitting }: Props) {
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-display text-2xl uppercase text-bone">Payment</h3>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-bone/50">
        <Lock size={12} /> Secured checkout — demo mode, no card is charged
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label className="mb-1 block font-display text-sm tracking-wide text-bone/60">
            Card Number
          </label>
          <input
            required
            inputMode="numeric"
            placeholder="4242 4242 4242 4242"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            className="w-full rounded-lg border border-bone/15 bg-ink px-4 py-3 text-sm text-bone outline-none focus:border-ember"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="mb-1 block font-display text-sm tracking-wide text-bone/60">
              Expiry
            </label>
            <input
              required
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="w-full rounded-lg border border-bone/15 bg-ink px-4 py-3 text-sm text-bone outline-none focus:border-ember"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block font-display text-sm tracking-wide text-bone/60">
              CVC
            </label>
            <input
              required
              placeholder="123"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              className="w-full rounded-lg border border-bone/15 bg-ink px-4 py-3 text-sm text-bone outline-none focus:border-ember"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button type="button" variant="ghost" className="flex-1" onClick={onBack} disabled={submitting}>
          Back
        </Button>
        <Button type="submit" className="flex-1" disabled={submitting}>
          {submitting ? 'Processing…' : 'Confirm & Join'}
        </Button>
      </div>
    </form>
  )
}
