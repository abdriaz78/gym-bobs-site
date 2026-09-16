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
    <section id="programs" className="bg-ink/95 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Programs & Services" heading="Every Way To Train, One Membership" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => {
            const Icon = icons[program.icon]
            return (
              <Card key={program.id} index={i} className="overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />
                  <div className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl bg-ink/70 text-brass backdrop-blur-sm">
                    <Icon size={22} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-extrabold tracking-tight text-bone">
                    {program.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone/70">{program.description}</p>
                  <a
                    href="#pricing"
                    className="mt-5 inline-block text-sm font-semibold text-brass hover:text-brass-light"
                  >
                    Learn More &rarr;
                  </a>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
