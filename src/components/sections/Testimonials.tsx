import { Star } from 'lucide-react'
import { testimonials } from '../../data/content'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

export function Testimonials() {
  return (
    <section id="results" className="bg-charcoal/95 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Transformations" heading="Real Members, Real Results" />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={t.name} index={i} className="p-8">
              <div className="flex gap-1 text-ember">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star key={star} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-5 text-base leading-relaxed text-bone/85">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3 border-t border-bone/10 pt-4">
                <img
                  src={t.photo}
                  alt={t.name}
                  loading="lazy"
                  className="h-11 w-11 rounded-full object-cover ring-1 ring-bone/15"
                />
                <div>
                  <p className="font-display tracking-wide text-bone">{t.name}</p>
                  <p className="text-sm text-blue-light">{t.result}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
