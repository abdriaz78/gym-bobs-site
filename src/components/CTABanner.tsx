import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/Button'

const DISMISS_KEY = 'gb-trial-banner-dismissed'

type Props = {
  onClaim: () => void
}

export function CTABanner({ onClaim }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return

    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setVisible(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function dismiss() {
    setVisible(false)
    sessionStorage.setItem(DISMISS_KEY, '1')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-brass/30 bg-ink/95 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
            <p className="text-sm text-bone">
              <span className="font-semibold text-brass">Free Trial Class</span>{' '}
              — first session on us, no commitment.
            </p>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => {
                  onClaim()
                  dismiss()
                }}
              >
                Claim Free Trial
              </Button>
              <button
                aria-label="Dismiss"
                onClick={dismiss}
                className="text-bone/50 hover:text-bone"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
