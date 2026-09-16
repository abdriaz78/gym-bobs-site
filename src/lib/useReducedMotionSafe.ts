import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Combines Framer Motion's reduced-motion preference with a mobile-width
// check, since the brief asks for lighter effects on mobile in addition to
// prefers-reduced-motion. Use this to decide whether to run GSAP/heavy
// scroll transforms at all.
export function useReducedMotionSafe(mobileBreakpoint = 768) {
  const prefersReduced = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`)
    const update = () => setIsMobile(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [mobileBreakpoint])

  return { prefersReduced: Boolean(prefersReduced), isMobile, simplify: Boolean(prefersReduced) || isMobile }
}
