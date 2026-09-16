import { useState } from 'react'
import { CTABanner } from './components/CTABanner'
import { Footer } from './components/Footer'
import { JoinModal } from './components/join/JoinModal'
import { Nav } from './components/Nav'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { FAQ } from './components/sections/FAQ'
import { Gallery } from './components/sections/Gallery'
import { Hero } from './components/sections/Hero'
import { OnlineCoaching } from './components/sections/OnlineCoaching'
import { Pricing } from './components/sections/Pricing'
import { Programs } from './components/sections/Programs'
import { Testimonials } from './components/sections/Testimonials'
import { Trainers } from './components/sections/Trainers'
import { MascotBreak } from './components/MascotBreak'
import { pricingTiers } from './data/content'

function App() {
  const [joinOpen, setJoinOpen] = useState(false)
  const [selectedPlanId, setSelectedPlanId] = useState(pricingTiers[0].id)

  function openJoin(planId?: string) {
    if (planId) setSelectedPlanId(planId)
    setJoinOpen(true)
  }

  return (
    <div className="bg-ink">
      <div className="bg-grain pointer-events-none fixed inset-0 z-[999] opacity-[0.05]" aria-hidden />
      <Nav onJoinClick={() => openJoin()} />
      <Hero onJoinClick={() => openJoin()} />
      <About />
      <MascotBreak
        src="/media/mascot-brown.mp4"
        eyebrow="Every Rep Counts"
        caption="No shortcuts. No excuses. Just you, getting stronger."
      />
      <Programs />
      <OnlineCoaching />
      <MascotBreak
        src="/media/mascot-blue.mp4"
        eyebrow="No Excuses"
        caption="Coached from anywhere. Held accountable everywhere."
      />
      <Trainers />
      <Testimonials />
      <Pricing onSelectPlan={(id) => openJoin(id)} />
      <Gallery />
      <FAQ />
      <Contact />
      <Footer />

      <CTABanner onClaim={() => openJoin()} />
      <JoinModal
        isOpen={joinOpen}
        initialPlanId={selectedPlanId}
        onClose={() => setJoinOpen(false)}
      />
    </div>
  )
}

export default App
