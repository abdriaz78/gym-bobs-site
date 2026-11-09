import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { pricingTiers } from '../../data/content'
import {
  fetchCheckoutStatus,
  redirectToCheckout,
  saveCheckoutDraft,
  takeCheckoutDraft,
  type CheckoutReturn,
  type CheckoutStatus,
} from '../../lib/stripe'
import { ConfirmStep } from './ConfirmStep'
import { InfoStep, type CustomerInfo } from './InfoStep'
import { PaymentStep } from './PaymentStep'
import { PlanStep } from './PlanStep'

type Step = 'plan' | 'info' | 'payment' | 'confirm'

type Props = {
  isOpen: boolean
  initialPlanId: string
  // Set when the page loaded from a Stripe Checkout redirect.
  checkoutReturn: CheckoutReturn | null
  onClose: () => void
}

const EMPTY_INFO: CustomerInfo = { name: '', email: '', phone: '' }

export function JoinModal({ isOpen, initialPlanId, checkoutReturn, onClose }: Props) {
  // Coming back from a cancelled checkout drops them on the payment step with
  // their earlier choices restored; a successful one goes to confirmation.
  const [draft] = useState(() => (checkoutReturn?.status === 'cancelled' ? takeCheckoutDraft() : null))
  const [step, setStep] = useState<Step>(
    checkoutReturn?.status === 'success' ? 'confirm' : draft ? 'payment' : 'plan',
  )
  const [planId, setPlanId] = useState(draft?.planId ?? initialPlanId)
  const [info, setInfo] = useState<CustomerInfo>(draft?.customer ?? EMPTY_INFO)
  const [submitting, setSubmitting] = useState(false)
  const [paymentError, setPaymentError] = useState('')
  const [showCancelled, setShowCancelled] = useState(checkoutReturn?.status === 'cancelled')
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus | null | undefined>(undefined)

  useEffect(() => {
    if (checkoutReturn?.status !== 'success') return
    takeCheckoutDraft()
    fetchCheckoutStatus(checkoutReturn.sessionId).then(setCheckoutStatus)
  }, [checkoutReturn])

  // Re-seed the flow whenever the modal transitions from closed to open,
  // following React's "adjust state during render" pattern instead of an
  // effect (avoids an extra cascading render).
  const [wasOpen, setWasOpen] = useState(isOpen)
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen)
    if (isOpen) {
      setPlanId(initialPlanId)
      setStep('plan')
    }
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const selectedTier = pricingTiers.find((t) => t.id === planId) ?? pricingTiers[0]

  const priceLabel = `$${selectedTier.price}/${selectedTier.billing === 'hr' ? 'session' : 'mo'}`

  async function handlePaymentSubmit() {
    setSubmitting(true)
    setPaymentError('')
    setShowCancelled(false)
    const input = { planId: selectedTier.id, customer: info }
    saveCheckoutDraft(input)
    // On success the browser navigates to Stripe and this never resolves to
    // anything meaningful; we only get here with an error message.
    const error = await redirectToCheckout(input)
    if (error) {
      setPaymentError(error)
      setSubmitting(false)
    }
  }

  function handleClose() {
    onClose()
    setShowCancelled(false)
    // Reset shortly after close animation finishes.
    setTimeout(() => {
      setInfo(EMPTY_INFO)
      setStep('plan')
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-bone/10 bg-charcoal-2 p-8"
          >
            <button
              aria-label="Close"
              onClick={handleClose}
              className="absolute right-5 top-5 text-bone/50 hover:text-bone"
            >
              <X size={22} />
            </button>

            <div className="mb-6 flex gap-1.5">
              {(['plan', 'info', 'payment', 'confirm'] as Step[]).map((s) => (
                <span
                  key={s}
                  className={`h-1 flex-1 rounded-full ${
                    s === step ||
                    (['plan', 'info', 'payment', 'confirm'] as Step[]).indexOf(s) <
                      (['plan', 'info', 'payment', 'confirm'] as Step[]).indexOf(step)
                      ? 'bg-brass'
                      : 'bg-bone/15'
                  }`}
                />
              ))}
            </div>

            {showCancelled && step !== 'confirm' && (
              <p
                role="status"
                className="mb-5 rounded-lg border border-bone/15 bg-ink px-4 py-3 text-sm text-bone/70"
              >
                Payment cancelled — you weren't charged. You can try again whenever you're ready.
              </p>
            )}

            {step === 'plan' && (
              <PlanStep
                selectedId={planId}
                onSelect={setPlanId}
                onNext={() => setStep('info')}
              />
            )}
            {step === 'info' && (
              <InfoStep
                info={info}
                onChange={setInfo}
                onBack={() => setStep('plan')}
                onNext={() => setStep('payment')}
              />
            )}
            {step === 'payment' && (
              <PaymentStep
                planName={selectedTier.name}
                priceLabel={priceLabel}
                error={paymentError}
                onBack={() => setStep('info')}
                onSubmit={handlePaymentSubmit}
                submitting={submitting}
              />
            )}
            {step === 'confirm' && (
              <ConfirmStep
                status={checkoutStatus}
                onClose={handleClose}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
