import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { pricingTiers } from '../../data/content'
import { createCheckoutSession } from '../../lib/stripe'
import { ConfirmStep } from './ConfirmStep'
import { InfoStep, type CustomerInfo } from './InfoStep'
import { PaymentStep } from './PaymentStep'
import { PlanStep } from './PlanStep'

type Step = 'plan' | 'info' | 'payment' | 'confirm'

type Props = {
  isOpen: boolean
  initialPlanId: string
  onClose: () => void
}

const EMPTY_INFO: CustomerInfo = { name: '', email: '', phone: '' }

export function JoinModal({ isOpen, initialPlanId, onClose }: Props) {
  const [step, setStep] = useState<Step>('plan')
  const [planId, setPlanId] = useState(initialPlanId)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [info, setInfo] = useState<CustomerInfo>(EMPTY_INFO)
  const [submitting, setSubmitting] = useState(false)
  const [confirmationId, setConfirmationId] = useState('')

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

  async function handlePaymentSubmit() {
    setSubmitting(true)
    const result = await createCheckoutSession({
      planId: selectedTier.id,
      planName: selectedTier.name,
      priceUsd: selectedTier.price,
      billingCycle,
      customer: info,
    })
    setSubmitting(false)
    setConfirmationId(result.confirmationId)
    setStep('confirm')
  }

  function handleClose() {
    onClose()
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

            {step === 'plan' && (
              <PlanStep
                selectedId={planId}
                billingCycle={billingCycle}
                onSelect={setPlanId}
                onBillingChange={setBillingCycle}
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
                onBack={() => setStep('info')}
                onSubmit={handlePaymentSubmit}
                submitting={submitting}
              />
            )}
            {step === 'confirm' && (
              <ConfirmStep
                confirmationId={confirmationId}
                planName={selectedTier.name}
                onClose={handleClose}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
