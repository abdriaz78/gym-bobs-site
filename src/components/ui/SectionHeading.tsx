import { motion } from 'framer-motion'

type Props = {
  eyebrow?: string
  heading: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, heading, align = 'left' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={align === 'center' ? 'text-center' : 'text-left'}
    >
      {eyebrow && (
        <p className="mb-3 font-display text-sm uppercase tracking-[0.3em] text-ember-light">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl uppercase leading-[0.95] text-bone sm:text-5xl md:text-6xl">
        {heading}
      </h2>
    </motion.div>
  )
}
