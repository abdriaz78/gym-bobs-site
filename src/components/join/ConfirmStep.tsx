import { CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/Button'

type Props = {
  confirmationId: string
  planName: string
  onClose: () => void
}

export function ConfirmStep({ confirmationId, planName, onClose }: Props) {
  return (
    <div className="flex flex-col items-center py-4 text-center">
      <CheckCircle2 size={56} className="text-brass" />
      <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-bone">Welcome to Gym Bob's</h3>
      <p className="mt-2 max-w-xs text-sm text-bone/70">
        You're signed up for the <span className="font-bold text-bone">{planName}</span> plan.
        A confirmation email is on its way.
      </p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-bone/40">
        Confirmation #{confirmationId}
      </p>
      <Button className="mt-8 w-full" onClick={onClose}>
        Done
      </Button>
    </div>
  )
}
