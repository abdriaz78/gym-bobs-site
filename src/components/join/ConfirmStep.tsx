import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import type { CheckoutStatus } from '../../lib/stripe'
import { Button } from '../ui/Button'

type Props = {
  // undefined while still verifying with Stripe, null if verification failed.
  status: CheckoutStatus | null | undefined
  onClose: () => void
}

export function ConfirmStep({ status, onClose }: Props) {
  if (status === undefined) {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <Loader2 size={40} className="animate-spin text-brass" />
        <p className="mt-4 text-sm text-bone/70">Confirming your payment…</p>
      </div>
    )
  }

  if (status === null || !status.paid) {
    return (
      <div className="flex flex-col items-center py-4 text-center">
        <AlertCircle size={56} className="text-bone/60" />
        <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-bone">Payment not confirmed</h3>
        <p className="mt-2 max-w-xs text-sm text-bone/70">
          We couldn't confirm your payment. If you were charged, check your email for a Stripe
          receipt or contact us and we'll sort it out.
        </p>
        <Button className="mt-8 w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center py-4 text-center">
      <CheckCircle2 size={56} className="text-brass" />
      <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-bone">Welcome to Gym Bob's</h3>
      <p className="mt-2 max-w-xs text-sm text-bone/70">
        You're signed up for the <span className="font-bold text-bone">{status.planName}</span> plan.
        A receipt is on its way to your email.
      </p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-bone/40">
        Confirmation #{status.confirmationId}
      </p>
      <Button className="mt-8 w-full" onClick={onClose}>
        Done
      </Button>
    </div>
  )
}
