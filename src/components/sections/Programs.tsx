import { Dumbbell, Laptop, Leaf, User, Video, type LucideIcon } from 'lucide-react'
import { programs, type Program } from '../../data/content'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

const icons: Record<Program['icon'], LucideIcon> = {
  dumbbell: Dumbbell,
  user: User,
  laptop: Laptop,
  video: Video,
  leaf: Leaf,
}

export function Programs() {
  return (
    <section id="programs" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Programs & Services" heading="Every Way To Train, One Membership" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => {
            const Icon = icons[program.icon]
            return (
              <Card key={program.id} index={i} className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember/15 text-ember-light">
                  <Icon size={24} />
                </div>
                <h3 className="mt-6 font-display text-xl uppercase tracking-wide text-bone">
                  {program.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/70">{program.description}</p>
                <a
                  href="#pricing"
                  className="mt-5 inline-block text-sm font-bold uppercase tracking-wide text-ember-light hover:text-ember"
                >
                  Learn More &rarr;
                </a>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
