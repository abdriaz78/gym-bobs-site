import { Star } from 'lucide-react'
import { testimonials } from '../../data/content'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

export function Testimonials() {
  return (
    <section id="results" className="bg-charcoal py-24 sm:py-32">
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
              <div className="mt-6 border-t border-bone/10 pt-4">
                <p className="font-bold uppercase tracking-wide text-bone">{t.name}</p>
                <p className="text-sm text-blue-light">{t.result}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
