import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '../lib/useReducedMotionSafe'

type Props = {
  src: string
  eyebrow: string
  caption: string
}

// Full-bleed video interstitial used as a breather between content
// sections — gradient-blended top/bottom so it reads as part of the same
// continuous scroll rather than a boxed-in card.
export function MascotBreak({ src, eyebrow, caption }: Props) {
  const { simplify } = useReducedMotionSafe()

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-[65vh] w-full overflow-hidden bg-ink sm:h-[80vh] md:h-[92vh]"
    >
      <video
        className="h-full w-full object-cover"
        src={src}
        autoPlay={!simplify}
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      <div className="absolute inset-0 bg-ink/25" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-brass">
          {eyebrow}
        </p>
        <p className="max-w-2xl text-2xl font-extrabold tracking-tight text-bone sm:text-3xl md:text-4xl">
          {caption}
        </p>
      </div>
    </motion.section>
  )
}
