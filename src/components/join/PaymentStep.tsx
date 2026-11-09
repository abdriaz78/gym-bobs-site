import { Lock } from 'lucide-react'
import type { FormEvent } from 'react'
import { Button } from '../ui/Button'

type Props = {
  planName: string
  priceLabel: string
  error: string
  onBack: () => void
  onSubmit: () => void
  submitting: boolean
}

// Card details are entered on Stripe's hosted checkout page, not here — this
// step just summarizes the order and hands off. See src/lib/stripe.ts.
export function PaymentStep({ planName, priceLabel, error, onBack, onSubmit, submitting }: Props) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl font-extrabold tracking-tight text-bone">Payment</h3>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-bone/50">
        <Lock size={12} /> Secure checkout powered by Stripe
      </p>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-bone/15 bg-ink px-5 py-4">
        <p className="font-semibold tracking-tight text-bone">{planName}</p>
        <p className="font-extrabold tracking-tight text-bone">{priceLabel}</p>
      </div>

      <p className="mt-4 text-sm text-bone/60">
        You'll be taken to Stripe's secure page to enter your card details, then brought right
        back here.
      </p>

      {error && (
        <p role="alert" className="mt-4 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <Button type="button" variant="ghost" className="flex-1" onClick={onBack} disabled={submitting}>
          Back
        </Button>
        <Button type="submit" className="flex-1" disabled={submitting}>
          {submitting ? 'Redirecting…' : 'Pay & Join'}
        </Button>
      </div>
    </form>
  )
}
