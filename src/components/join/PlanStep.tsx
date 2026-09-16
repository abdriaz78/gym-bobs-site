import { pricingTiers } from '../../data/content'
import { Button } from '../ui/Button'

type Props = {
  selectedId: string
  billingCycle: 'monthly' | 'annual'
  onSelect: (id: string) => void
  onBillingChange: (cycle: 'monthly' | 'annual') => void
  onNext: () => void
}

export function PlanStep({ selectedId, billingCycle, onSelect, onBillingChange, onNext }: Props) {
  return (
    <div>
      <h3 className="font-display text-2xl uppercase text-bone">Choose Your Plan</h3>

      <div className="mt-4 inline-flex rounded-full border border-bone/15 bg-ink p-1 text-xs font-bold uppercase">
        <button
          onClick={() => onBillingChange('monthly')}
          className={`rounded-full px-4 py-2 transition-colors ${
            billingCycle === 'monthly' ? 'bg-ember text-white' : 'text-bone/60'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => onBillingChange('annual')}
          className={`rounded-full px-4 py-2 transition-colors ${
            billingCycle === 'annual' ? 'bg-ember text-white' : 'text-bone/60'
          }`}
        >
          Annual (save 15%)
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {pricingTiers.map((tier) => {
          const price =
            billingCycle === 'annual' ? Math.round(tier.price * 12 * 0.85) : tier.price
          const isSelected = tier.id === selectedId
          return (
            <button
              key={tier.id}
              onClick={() => onSelect(tier.id)}
              className={`flex w-full items-center justify-between rounded-xl border px-5 py-4 text-left transition-colors ${
                isSelected
                  ? 'border-ember bg-ember/10'
                  : 'border-bone/15 bg-charcoal-2 hover:border-bone/30'
              }`}
            >
              <div>
                <p className="font-bold uppercase tracking-wide text-bone">{tier.name}</p>
                <p className="text-xs text-bone/60">{tier.description}</p>
              </div>
              <p className="font-display text-lg text-bone">
                ${price}
                <span className="text-xs text-bone/50">
                  /{billingCycle === 'annual' ? 'yr' : 'mo'}
                </span>
              </p>
            </button>
          )
        })}
      </div>

      <Button className="mt-6 w-full" onClick={onNext}>
        Continue
      </Button>
    </div>
  )
}
