'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import SocialProof from '@/components/sections/SocialProof'
import InnovationGrid from '@/components/sections/InnovationGrid'
import ProductsSection from '@/components/sections/ProductsSection'
import ComparisonSection from '@/components/sections/ComparisonSection'
import ScienceOfDryness from '@/components/sections/ScienceOfDryness'
import AbsorbencyDemo from '@/components/sections/AbsorbencyDemo'
import Testimonials from '@/components/sections/Testimonials'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/sections/Footer'
import { scrollToSection } from '@/utils/scroll'
import { FilterType } from '@/types'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productFilter, setProductFilter] = useState<FilterType | undefined>(undefined)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleFooterProductFilter = (filterType: FilterType) => {
    // Scroll to products section
    scrollToSection('products')
    
    // Set filter after a small delay to ensure scroll starts
    setTimeout(() => {
      setProductFilter(filterType)
      // Reset filter after it's been applied so it can be triggered again
      setTimeout(() => setProductFilter(undefined), 100)
    }, 300)
  }

  return (
    <main className="min-h-screen relative">
      <Navbar 
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <Hero />

      <SocialProof />

      <InnovationGrid />

      <ProductsSection initialFilter={productFilter} />

      <ComparisonSection />

      <ScienceOfDryness />

      <AbsorbencyDemo />

      <Testimonials />

      <ContactSection />

      <Footer onProductFilter={handleFooterProductFilter} />
    </main>
  )
}
