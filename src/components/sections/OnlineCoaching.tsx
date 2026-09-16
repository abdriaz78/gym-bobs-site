import { motion } from 'framer-motion'
import { onlineCoaching } from '../../data/content'

export function OnlineCoaching() {
  return (
    <section id="online-coaching" className="bg-charcoal/95 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -1 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-3xl border border-bone/10 bg-ink"
        >
          <video
            className="aspect-video w-full object-cover"
            src="/media/mascot-blue.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-3 font-display text-sm uppercase tracking-[0.3em] text-blue-light">
            {onlineCoaching.eyebrow}
          </p>
          <h2 className="font-display text-4xl uppercase leading-[0.95] text-bone sm:text-5xl">
            {onlineCoaching.heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-bone/75">{onlineCoaching.body}</p>

          <ol className="mt-8 space-y-5">
            {onlineCoaching.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue/20 font-display text-sm text-blue-light">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display tracking-wide text-bone">{step.title}</p>
                  <p className="text-sm text-bone/65">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  )
}
