import { Check } from 'lucide-react'
import { pricingTiers } from '../../data/content'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'

type Props = {
  onSelectPlan: (planId: string) => void
}

export function Pricing({ onSelectPlan }: Props) {
  return (
    <section id="pricing" className="bg-ink/95 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading align="center" eyebrow="Membership Plans" heading="Find Your Plan" />
        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-bone/60">
          All plans are month-to-month. Prices shown before local tax; tax is calculated at
          checkout.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier, i) => (
            <Card
              key={tier.id}
              index={i}
              className={`relative flex flex-col p-8 ${
                tier.featured ? 'border-ember/60 ring-1 ring-ember/40' : ''
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ember px-4 py-1 font-display text-sm tracking-wide text-white">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl uppercase tracking-wide text-bone">{tier.name}</h3>
              <p className="mt-2 text-sm text-bone/60">{tier.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl text-bone">${tier.price}</span>
                <span className="text-sm text-bone/50">/{tier.billing}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-bone/75">
                    <Check size={16} className="mt-0.5 shrink-0 text-blue-light" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.featured ? 'primary' : 'secondary'}
                className="mt-8 w-full"
                onClick={() => onSelectPlan(tier.id)}
              >
                Join Now
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
