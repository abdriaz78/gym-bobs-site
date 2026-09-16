import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'
import { brand } from '../../data/content'
import { useReducedMotionSafe } from '../../lib/useReducedMotionSafe'
import { Button } from '../ui/Button'

type Props = {
  onJoinClick: () => void
}

export function Hero({ onJoinClick }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { simplify } = useReducedMotionSafe()

  useLayoutEffect(() => {
    if (simplify || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(videoRef.current, {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to(contentRef.current, {
        yPercent: 40,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [simplify])

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-ink"
    >
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/media/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/60" />
      </div>

      <div ref={contentRef} className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <img
          src="/media/logo-transparent.png"
          alt={brand.name}
          className="mx-auto mb-8 h-20 w-auto drop-shadow-[0_8px_30px_rgba(0,0,0,0.7)] sm:h-28 md:h-32"
        />
        <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-bone sm:text-7xl md:text-8xl">
          {brand.name}
        </h1>
        <span className="mt-4 inline-block rounded-full border border-brass/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brass">
          Est. 1996
        </span>
        <p className="mx-auto mt-4 max-w-2xl text-xl font-semibold tracking-tight text-brass sm:text-2xl md:text-3xl">
          {brand.tagline}
        </p>
        <p className="mx-auto mt-6 max-w-xl text-base text-bone/80 sm:text-lg">
          {'In-person training, online coaching, and virtual programs — one standard, wherever you show up.'}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button onClick={onJoinClick} className="px-8 py-4 text-base">
            Start Your Transformation
          </Button>
          <a href="#pricing">
            <Button variant="ghost" className="px-8 py-4 text-base">
              See Membership Plans
            </Button>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-bone/60">
        <div className="h-9 w-5 rounded-full border-2 border-bone/40 p-1">
          <div className="h-2 w-1 rounded-full bg-bone/70" />
        </div>
      </div>
    </section>
  )
}
