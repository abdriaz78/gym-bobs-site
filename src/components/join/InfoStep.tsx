import type { FormEvent } from 'react'
import { Button } from '../ui/Button'

export type CustomerInfo = {
  name: string
  email: string
  phone: string
}

type Props = {
  info: CustomerInfo
  onChange: (info: CustomerInfo) => void
  onBack: () => void
  onNext: () => void
}

export function InfoStep({ info, onChange, onBack, onNext }: Props) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl font-extrabold tracking-tight text-bone">Your Info</h3>

      <div className="mt-5 space-y-4">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-bone/60">
            Full Name
          </label>
          <input
            required
            type="text"
            value={info.name}
            onChange={(e) => onChange({ ...info, name: e.target.value })}
            className="w-full rounded-lg border border-bone/15 bg-ink px-4 py-3 text-sm text-bone outline-none focus:border-brass"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-bone/60">
            Email
          </label>
          <input
            required
            type="email"
            value={info.email}
            onChange={(e) => onChange({ ...info, email: e.target.value })}
            className="w-full rounded-lg border border-bone/15 bg-ink px-4 py-3 text-sm text-bone outline-none focus:border-brass"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-bone/60">
            Phone
          </label>
          <input
            required
            type="tel"
            value={info.phone}
            onChange={(e) => onChange({ ...info, phone: e.target.value })}
            className="w-full rounded-lg border border-bone/15 bg-ink px-4 py-3 text-sm text-bone outline-none focus:border-brass"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button type="button" variant="ghost" className="flex-1" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="flex-1">
          Continue
        </Button>
      </div>
    </form>
  )
}
