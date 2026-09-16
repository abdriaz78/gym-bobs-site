import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { about, stats } from '../../data/content'

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString())

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [inView, value, count])

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl text-bone sm:text-5xl">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <p className="mt-2 font-display text-sm tracking-widest text-bone/60">{label}</p>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="relative bg-charcoal/95 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-3 font-display text-sm uppercase tracking-[0.3em] text-ember-light">
            {about.eyebrow}
          </p>
          <h2 className="font-display text-4xl uppercase leading-[0.95] text-bone sm:text-5xl">
            {about.heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-bone/75">
            {about.body}
          </p>
          <ul className="mt-6 space-y-3">
            {about.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-bone/85">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-6 rounded-3xl border border-bone/10 bg-charcoal-2 p-8 sm:p-10"
        >
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
