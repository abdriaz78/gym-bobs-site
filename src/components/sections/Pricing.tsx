import { Check } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { pricingTiers } from '../../data/content'
import { submitForm } from '../../lib/forms'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'

type Props = {
  onSelectPlan: (planId: string) => void
}

const membershipCategories = ['Standard Membership', 'Students', 'Seniors', 'State Membership']

export function Pricing({ onSelectPlan }: Props) {
  const personalTraining = pricingTiers.find((t) => t.id === 'personal-training')

  const [customName, setCustomName] = useState('')
  const [customEmail, setCustomEmail] = useState('')
  const [customPlan, setCustomPlan] = useState('')
  const [customSent, setCustomSent] = useState(false)
  const [customSubmitting, setCustomSubmitting] = useState(false)
  const [customError, setCustomError] = useState(false)

  async function handleCustomSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setCustomSubmitting(true)
    setCustomError(false)
    const ok = await submitForm({
      form: 'plan',
      name: customName,
      email: customEmail,
      plan: customPlan,
    })
    setCustomSubmitting(false)
    if (ok) {
      setCustomSent(true)
    } else {
      setCustomError(true)
    }
  }

  return (
    <section id="pricing" className="bg-ink/95 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading align="center" eyebrow="Membership Plans" heading="Find Your Plan" />
        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-bone/60">
          All plans are month-to-month. Prices shown before local tax; tax is calculated at
          checkout.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {membershipCategories.map((category, i) => {
            const tiers = pricingTiers.filter((t) => t.category === category)
            const individual = tiers.find((t) => t.id.endsWith('-individual'))!
            const family = tiers.find((t) => t.id.endsWith('-family'))!
            const isFeatured = category === 'Standard Membership'

            return (
              <Card
                key={category}
                index={i}
                className={`relative flex flex-col p-8 ${
                  isFeatured ? 'border-brass/60 ring-1 ring-brass/40' : ''
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brass px-4 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-ink">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-extrabold tracking-tight text-bone">{category}</h3>
                <p className="mt-2 text-sm text-bone/60">{individual.description}</p>

                <div className="mt-6 space-y-3">
                  {[
                    { label: 'Individual', tier: individual },
                    { label: 'Family', tier: family },
                  ].map(({ label, tier }) => (
                    <div
                      key={tier.id}
                      className="flex items-center justify-between rounded-xl border border-bone/10 bg-ink/40 px-4 py-3"
                    >
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-bone/60">
                          {label}
                        </p>
                        <p className="text-lg font-extrabold tracking-tight text-bone">
                          ${tier.price}
                          <span className="text-xs font-normal text-bone/50">/{tier.billing}</span>
                        </p>
                      </div>
                      <Button
                        variant={isFeatured && label === 'Individual' ? 'primary' : 'secondary'}
                        onClick={() => onSelectPlan(tier.id)}
                      >
                        Join
                      </Button>
                    </div>
                  ))}
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {individual.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-bone/75">
                      <Check size={16} className="mt-0.5 shrink-0 text-brass" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {personalTraining && (
            <Card className="flex flex-col p-8">
              <h3 className="text-xl font-extrabold tracking-tight text-bone">Personal Training</h3>
              <p className="mt-2 text-sm text-bone/60">{personalTraining.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-bone">
                  ${personalTraining.price}
                </span>
                <span className="text-sm text-bone/50">
                  /{personalTraining.billing} &middot; Basic package
                </span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {personalTraining.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-bone/75">
                    <Check size={16} className="mt-0.5 shrink-0 text-brass" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button className="mt-8 w-full" onClick={() => onSelectPlan(personalTraining.id)}>
                Book a Trainer
              </Button>
            </Card>
          )}

          <Card className="flex flex-col p-8">
            <h3 className="text-xl font-extrabold tracking-tight text-bone">Need Something Custom?</h3>
            <p className="mt-2 text-sm text-bone/60">
              Tell us your goals, schedule, or budget and we'll build a plan around them.
            </p>

            {customSent ? (
              <div className="mt-6 flex flex-1 flex-col items-center justify-center text-center">
                <p className="text-sm text-bone/80">
                  Thanks — a member of our team will reach out with a custom plan shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCustomSubmit} className="mt-6 flex flex-1 flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    type="text"
                    placeholder="Name"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full rounded-lg border border-bone/15 bg-ink px-4 py-3 text-sm text-bone outline-none focus:border-brass"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="w-full rounded-lg border border-bone/15 bg-ink px-4 py-3 text-sm text-bone outline-none focus:border-brass"
                  />
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the plan you're looking for (goals, sessions per week, budget...)"
                  value={customPlan}
                  onChange={(e) => setCustomPlan(e.target.value)}
                  className="w-full flex-1 resize-none rounded-lg border border-bone/15 bg-ink px-4 py-3 text-sm text-bone outline-none focus:border-brass"
                />
                {customError && (
                  <p className="text-sm text-red-400">
                    Something went wrong sending your request — please try again or call us directly.
                  </p>
                )}
                <Button type="submit" className="w-full" disabled={customSubmitting}>
                  {customSubmitting ? 'Sending…' : 'Request Custom Plan'}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
