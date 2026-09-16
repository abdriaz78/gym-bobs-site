import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe'

type Props = {
  children: ReactNode
  className?: string
  index?: number
}

// Scroll-triggered 3D tilt/scale reveal. Falls back to a plain fade for
// reduced-motion or mobile, per the brief's accessibility/perf requirements.
export function Card({ children, className = '', index = 0 }: Props) {
  const { simplify } = useReducedMotionSafe()

  const initial = simplify
    ? { opacity: 0 }
    : { opacity: 0, rotateX: 8, y: 40, scale: 0.94 }
  const animate = simplify
    ? { opacity: 1 }
    : { opacity: 1, rotateX: 0, y: 0, scale: 1 }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: simplify ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1000 }}
      className={`rounded-2xl border border-bone/10 bg-charcoal-2 ${className}`}
    >
      {children}
    </motion.div>
  )
}
