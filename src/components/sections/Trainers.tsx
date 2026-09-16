import { trainers } from '../../data/content'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

export function Trainers() {
  return (
    <section id="trainers" className="relative overflow-hidden bg-ink/95 py-24 sm:py-32">
      <img
        src="/media/mascot-brown.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-16 w-72 rotate-6 opacity-10 sm:w-96"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Meet The Coaches" heading="The Team Behind Your Results" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((trainer, i) => (
            <Card key={trainer.name} index={i} className="group overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-display text-xl tracking-wide text-bone">{trainer.name}</h3>
                <p className="mt-1 font-display text-sm tracking-widest text-ember-light">
                  {trainer.specialty}
                </p>
                <p className="mt-3 text-sm text-bone/65">{trainer.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
