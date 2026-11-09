import { pricingTiers } from '../../data/content'
import { Button } from '../ui/Button'

type Props = {
  selectedId: string
  onSelect: (id: string) => void
  onNext: () => void
}

export function PlanStep({ selectedId, onSelect, onNext }: Props) {
  return (
    <div>
      <h3 className="text-2xl font-extrabold tracking-tight text-bone">Choose Your Plan</h3>

      <div className="mt-5 space-y-3">
        {pricingTiers.map((tier) => {
          const suffix = tier.billing === 'hr' ? 'session' : 'mo'
          const isSelected = tier.id === selectedId
          return (
            <button
              key={tier.id}
              onClick={() => onSelect(tier.id)}
              className={`flex w-full items-center justify-between rounded-xl border px-5 py-4 text-left transition-colors ${
                isSelected
                  ? 'border-brass bg-brass/10'
                  : 'border-bone/15 bg-charcoal-2 hover:border-bone/30'
              }`}
            >
              <div>
                <p className="font-semibold tracking-tight text-bone">{tier.name}</p>
                <p className="text-xs text-bone/60">{tier.description}</p>
              </div>
              <p className="font-extrabold tracking-tight text-bone">
                ${tier.price}
                <span className="text-xs font-normal text-bone/50">/{suffix}</span>
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
