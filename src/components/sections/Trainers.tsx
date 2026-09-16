import { trainers } from '../../data/content'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

export function Trainers() {
  return (
    <section id="trainers" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <img
        src="/media/mascot-brown.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-16 w-72 rotate-6 opacity-20 sm:w-96"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Meet The Coaches" heading="The Team Behind Your Results" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((trainer, i) => (
            <Card key={trainer.name} index={i} className="overflow-hidden p-6 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-maroon to-blue font-display text-2xl text-bone">
                {trainer.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <h3 className="mt-5 font-display text-lg uppercase tracking-wide text-bone">
                {trainer.name}
              </h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-ember-light">
                {trainer.specialty}
              </p>
              <p className="mt-3 text-sm text-bone/65">{trainer.bio}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
