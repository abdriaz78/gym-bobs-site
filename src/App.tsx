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
      <Nav onJoinClick={() => openJoin()} />
      <Hero onJoinClick={() => openJoin()} />
      <About />
      <Programs />
      <OnlineCoaching />
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
