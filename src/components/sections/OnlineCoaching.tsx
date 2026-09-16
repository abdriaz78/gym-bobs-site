import { motion } from 'framer-motion'
import { onlineCoaching } from '../../data/content'

export function OnlineCoaching() {
  return (
    <section id="online-coaching" className="bg-charcoal/95 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-3xl px-6 text-center"
      >
        <span className="mb-4 inline-block rounded-full border border-brass/40 bg-brass/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-brass">
          {onlineCoaching.eyebrow}
        </span>
        <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-bone sm:text-5xl">
          {onlineCoaching.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-bone/75">
          {onlineCoaching.body}
        </p>
      </motion.div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {onlineCoaching.steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brass/15 text-sm font-bold text-brass">
              {i + 1}
            </span>
            <p className="mt-3 font-semibold tracking-tight text-bone">{step.title}</p>
            <p className="mt-1 text-sm text-bone/65">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
