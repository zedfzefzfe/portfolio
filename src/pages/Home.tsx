import { useEffect } from 'react'
import { Hero } from '@/sections/Hero'
import { TickerBanner } from '@/sections/TickerBanner'
import { About } from '@/sections/About'
import { AngledMarquee } from '@/sections/AngledMarquee'
import { Services } from '@/sections/Services'
import { Portfolio } from '@/sections/Portfolio'
import { ClientResults } from '@/sections/ClientResults'
import { Technologies } from '@/sections/Technologies'
import { Contact } from '@/sections/Contact'
import { Footer } from '@/sections/Footer'
import { applyGlobalTextReveal } from '@/lib/textReveal'

export default function Home() {
  useEffect(() => {
    // Run after all section useEffects (About, Services, etc.) have already
    // registered their own GSAP animations and reveal-word spans, so we
    // don't double-process anything they already handled.
    const id = setTimeout(() => {
      requestAnimationFrame(applyGlobalTextReveal)
    }, 120)
    return () => clearTimeout(id)
  }, [])

  return (
    <>
      <Hero />
      <TickerBanner />
      <About />
      <AngledMarquee />
      <Services />
      <Portfolio />
      <ClientResults />
      <Technologies />
      <Contact />
      <Footer />
    </>
  )
}
