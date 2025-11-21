'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Menu, X as CloseIcon } from 'lucide-react'
import { scrollToSection, scrollToProducts } from '@/utils/scroll'

interface NavbarProps {
  isScrolled: boolean
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export default function Navbar({ isScrolled, mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-white/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Image
              src="/images/logo.jpg"
              alt="NoliQS Logo"
              width={180}
              height={60}
              className="h-14 md:h-16 w-auto object-contain"
              priority
            />
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('science')}
              className="text-gray-700 hover:text-soft-blue-600 transition-colors"
            >
              Our Science
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="text-gray-700 hover:text-soft-blue-600 transition-colors"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection('reviews')}
              className="text-gray-700 hover:text-soft-blue-600 transition-colors"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-soft-blue-600 transition-colors"
            >
              Contact
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProducts}
              className="pill-button bg-coral-500 text-white shadow-lg hover:bg-coral-600"
            >
              Shop Now
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 space-y-4 bg-white/95 backdrop-blur-md border-t border-gray-200"
          >
            <button 
              onClick={() => {
                scrollToSection('science')
                setMobileMenuOpen(false)
              }}
              className="block text-gray-700 text-left w-full hover:text-soft-blue-600 transition-colors"
            >
              Our Science
            </button>
            <button 
              onClick={() => {
                scrollToSection('products')
                setMobileMenuOpen(false)
              }}
              className="block text-gray-700 text-left w-full hover:text-soft-blue-600 transition-colors"
            >
              Products
            </button>
            <button 
              onClick={() => {
                scrollToSection('reviews')
                setMobileMenuOpen(false)
              }}
              className="block text-gray-700 text-left w-full hover:text-soft-blue-600 transition-colors"
            >
              Reviews
            </button>
            <button 
              onClick={() => {
                scrollToSection('contact')
                setMobileMenuOpen(false)
              }}
              className="block text-gray-700 text-left w-full hover:text-soft-blue-600 transition-colors"
            >
              Contact
            </button>
            <button 
              onClick={() => {
                scrollToProducts()
                setMobileMenuOpen(false)
              }}
              className="pill-button bg-coral-500 text-white w-full hover:bg-coral-600"
            >
              Shop Now
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

