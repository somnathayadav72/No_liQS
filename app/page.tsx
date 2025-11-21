'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Droplet, 
  Shield, 
  Zap, 
  Leaf, 
  Check, 
  X, 
  Star, 
  ChevronDown,
  Menu,
  X as CloseIcon,
  Heart,
  Cloud,
  Sparkles,
  Package
} from 'lucide-react'
import Image from 'next/image'
import productsData from './products.json'
import emailjs from '@emailjs/browser'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<number | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [displayCount, setDisplayCount] = useState(8)
  const [isLoading, setIsLoading] = useState(false)
  const [expandedProducts, setExpandedProducts] = useState<Set<number>>(new Set())
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Form validation
  const isFormValid = contactForm.name.trim() !== '' && 
                      contactForm.email.trim() !== '' && 
                      contactForm.subject.trim() !== '' && 
                      contactForm.message.trim() !== '' &&
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [1, 0])
  const y = useTransform(scrollY, [0, 100], [0, -50])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setDisplayCount(prev => prev + 8)
      setIsLoading(false)
    }, 800)
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToProducts = () => {
    scrollToSection('products')
  }

  const handleFooterProductFilter = (filterType: 'diaper' | 'pant' | 'all') => {
    // Scroll to products section
    const productsSection = document.getElementById('products')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    
    // Set filter after a small delay to ensure scroll starts
    setTimeout(() => {
      if (filterType === 'all') {
        setSelectedType(null)
        setSelectedSize(null)
      } else {
        setSelectedType(filterType)
      }
      setDisplayCount(8) // Reset display count
      setExpandedProducts(new Set()) // Reset expanded products
    }, 100)
  }

  useEffect(() => {
    // Initialize EmailJS only if public key is available
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (publicKey && publicKey !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(publicKey)
    }
  }, [])

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const yourEmail = process.env.NEXT_PUBLIC_YOUR_EMAIL

      // Check if EmailJS is configured
      if (!serviceId || !templateId || serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID') {
        throw new Error('EmailJS is not configured. Please set up your environment variables. See EMAILJS_SETUP.md for instructions.')
      }

      const templateParams = {
        from_name: contactForm.name,
        from_email: contactForm.email,
        phone: contactForm.phone || 'Not provided',
        subject: contactForm.subject,
        message: contactForm.message,
        to_email: yourEmail || 'your-email@example.com',
        reply_to: contactForm.email,
      }

      // Send email notification to you
      await emailjs.send(serviceId, templateId, templateParams)

      setSubmitStatus('success')
      setContactForm({ 
        name: '', 
        email: '', 
        phone: '', 
        subject: '', 
        message: '' 
      })
      
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
      
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  }

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  const cloudAnimation = {
    x: [0, 20, 0],
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  const starAnimation = {
    rotate: [0, 360],
    scale: [1, 1.2, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <main className="min-h-screen relative">

      {/* Navbar */}
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
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
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

      {/* Hero Section - Redesigned */}
      <section className="relative pt-40 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50" style={{ marginTop: 0, minHeight: '90vh' }}>
        {/* Static Gradient Background - Optimized */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-pink-100/30" />
        
        {/* Simplified Floating Orbs - Static with subtle animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/15 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - Enhanced */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="space-y-8 lg:pr-8"
            >
              <motion.div variants={staggerItem} className="inline-block">
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-coral-400 to-pink-400 text-white text-sm font-bold shadow-lg backdrop-blur-sm"
                >
                  ✨ Premium Baby Diaper Pants
                </motion.span>
              </motion.div>

              <motion.h1
                variants={staggerItem}
                className="text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold leading-[1.1] tracking-tight"
              >
                <motion.span
                  initial={{ opacity: 0, x: -30, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
                  className="block text-gray-900"
                >
                  Comfy on Your
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -30, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
                  className="block gradient-text mt-2"
                >
                  Skin, Baby
                </motion.span>
              </motion.h1>
              
              <motion.p
                variants={staggerItem}
                className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                10-hour all-night protection with <span className="font-bold gradient-text">Bubble Technology</span> & 3-layer leakage protection. 
                <br className="hidden sm:block" />
                <span className="text-lg md:text-xl text-gray-600 block mt-2">+30% High Absorbency • 7 Glasses (350ml) Capacity</span>
              </motion.p>

              {/* Product Info Pills - Enhanced */}
              <motion.div
                variants={staggerItem}
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {[
                  { label: 'Size L', value: '9-14 kg', icon: '📦' },
                  { label: '50 Pcs', value: 'Per Pack', icon: '✨' },
                  { label: '10 Hours', value: 'Protection', icon: '🛡️' }
                ].map((info, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="glassmorphism rounded-2xl px-5 py-3 flex items-center gap-3 shadow-lg backdrop-blur-xl border border-white/50"
                  >
                    <span className="text-2xl">{info.icon}</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-sm">{info.label}</span>
                      <span className="text-xs text-gray-600">{info.value}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-5 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToProducts}
                  className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-coral-500 to-pink-500 text-white text-lg font-bold shadow-2xl hover:shadow-coral-500/50 transition-all duration-200 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Shop Now →
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-coral-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('comparison')}
                  className="px-8 py-4 rounded-2xl bg-white/90 backdrop-blur-md text-gray-800 text-lg font-bold border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 shadow-lg transition-all duration-200"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Image - 3D Floating Card - Optimized */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative h-[550px] lg:h-[700px]"
            >
              {/* 3D Card Container - Simplified */}
              <motion.div
                className="card-3d relative h-full w-full"
                whileHover={{ 
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/50">
                  <Image
                    src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80"
                    alt="Happy baby with NoliQS premium diaper"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  
                  {/* Floating Badge - Simplified */}
                  <div className="absolute top-8 right-8 glassmorphism rounded-2xl px-5 py-3 flex items-center gap-3 z-10 shadow-xl backdrop-blur-xl">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-gray-900">Premium</span>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-2xl border border-white/50">
                      <p className="text-gray-900 font-bold text-base drop-shadow-sm">Trusted by 10,000+ Parents</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Static Glow Effect Behind Card */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-400/20 via-pink-400/20 to-purple-400/20 rounded-[2.5rem] blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-700 font-medium ml-2">Trusted by 10,000+ Parents</span>
            </div>
            <div className="flex items-center gap-6 text-gray-500">
              <span className="text-sm">Featured in:</span>
              <div className="flex gap-4">
                <span className="text-xs font-semibold">PARENTING</span>
                <span className="text-xs font-semibold">BABY MAG</span>
                <span className="text-xs font-semibold">MOM & BABY</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Innovation Bento Grid */}
      <section id="science" className="py-32 px-4 sm:px-6 lg:px-8 laser-container">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
              Innovation That Cares
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Every feature designed with your baby's comfort and your peace of mind
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: High Absorbent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="glassmorphism rounded-3xl p-8 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-soft-blue-200 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="w-16 h-16 rounded-full bg-baby-blue flex items-center justify-center mb-4 relative z-10">
                <Droplet className="w-8 h-8 text-soft-blue-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 text-gray-900">High Absorbent</h3>
              <p className="text-gray-700 mb-3 text-lg">
                +30% high absorbency technology
              </p>
              <div className="text-base text-soft-blue-600 font-bold">
                7 Glasses (350ml) Capacity
              </div>
            </motion.div>

            {/* Card 2: 10 Hour Protection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="glassmorphism rounded-3xl p-8 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-coral-200 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="w-16 h-16 rounded-full bg-soft-blue flex items-center justify-center mb-4 relative z-10">
                <Shield className="w-8 h-8 text-soft-blue-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 text-gray-900">10 Hour Protection</h3>
              <p className="text-gray-700 mb-3 text-lg">
                All-night protection for uninterrupted sleep
              </p>
              <div className="text-base text-soft-blue-600 font-bold">
                3-Layer Leakage Protection
              </div>
            </motion.div>

            {/* Card 3: 360° Soft Fit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="glassmorphism rounded-3xl p-8 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-baby-blue-200 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="w-16 h-16 rounded-full bg-coral-100 flex items-center justify-center mb-4 relative z-10">
                <Zap className="w-8 h-8 text-coral-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 text-gray-900">360° Soft Fit Waistband</h3>
              <p className="text-gray-700 mb-3 text-lg">
                Comfortable fit that moves with your baby
              </p>
              <div className="text-base text-soft-blue-600 font-bold">
                Comfort Fit Design
              </div>
            </motion.div>

            {/* Card 4: Anti-Rash */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="glassmorphism rounded-3xl p-8 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-baby-blue-200 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="w-16 h-16 rounded-full bg-baby-blue flex items-center justify-center mb-4 relative z-10">
                <Leaf className="w-8 h-8 text-soft-blue-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 text-gray-900">Anti-Rash Protection</h3>
              <p className="text-gray-700 mb-3 text-lg">
                Non-woven soft and breathable material
              </p>
              <div className="text-base text-soft-blue-600 font-bold">
                Cotton Soft Layers
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-baby-blue-50 to-off-white laser-container">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
              Shop NoliQS Products
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Choose from our range of premium baby diapers
            </p>
          </motion.div>

          {/* Filters - Sticky */}
          <div className="sticky top-[80px] md:top-20 z-40 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 justify-center glassmorphism rounded-3xl p-4 backdrop-blur-md"
            >
            {/* Size Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-semibold text-gray-700 self-center">Size:</span>
              {['All', 'S', 'M', 'L', 'XL'].map((size) => (
                <motion.button
                  key={size}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedSize(size === 'All' ? null : size)
                    setDisplayCount(8) // Reset display count when filter changes
                    setExpandedProducts(new Set()) // Reset expanded products
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSize === (size === 'All' ? null : size)
                      ? 'bg-soft-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-baby-blue-100 border border-gray-200'
                  }`}
                >
                  {size}
                </motion.button>
              ))}
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-semibold text-gray-700 self-center">Type:</span>
              {['All', 'diaper', 'pant'].map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedType(type === 'All' ? null : type)
                    setDisplayCount(8) // Reset display count when filter changes
                    setExpandedProducts(new Set()) // Reset expanded products
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedType === (type === 'All' ? null : type)
                      ? 'bg-coral-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-baby-blue-100 border border-gray-200'
                  }`}
                >
                  {type === 'All' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                </motion.button>
              ))}
            </div>
            </motion.div>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsData
              .filter((product: any) => {
                if (selectedSize && product.size !== selectedSize) return false
                if (selectedType && product.diaperType !== selectedType) return false
                return true
              })
              .slice(0, displayCount)
              .map((product: any, idx: number) => {
                const isExpanded = expandedProducts.has(idx)
                const sizeLabels: { [key: string]: string } = {
                  'S': 'Small (4-8 kg)',
                  'M': 'Medium (6-11 kg)',
                  'L': 'Large (9-14 kg)',
                  'XL': 'Extra Large (12-18 kg)',
                  'Mixed': 'Mixed Sizes'
                }

                const isPremium = product.features.some((f: string) => 
                  f.toLowerCase().includes('premium')
                )

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, type: "spring" }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="glassmorphism rounded-3xl p-6 hover:shadow-2xl transition-all cursor-pointer group relative flex flex-col h-full"
                  >
                    {/* Product Badge */}
                    {isPremium && (
                      <div className="absolute top-4 right-4 bg-coral-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                        Premium
                      </div>
                    )}

                    {/* Product Image */}
                    <div className="relative h-48 mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-soft-blue-200 to-soft-blue-300">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={`NoliQS ${product.diaperType === 'pant' ? 'Pant' : 'Diaper'} ${product.size} - ${product.pcs} Pcs`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="flex items-center justify-center drop-shadow-lg"
                          >
                            <svg 
                              className="w-28 h-28 text-white" 
                              viewBox="0 0 100 100" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}
                            >
                              {/* Diaper shape */}
                              <path 
                                d="M 30 20 Q 20 20 20 30 L 20 70 Q 20 80 30 80 L 50 80 L 50 75 Q 50 70 55 70 L 70 70 Q 75 70 75 65 L 75 35 Q 75 30 70 30 L 55 30 Q 50 30 50 25 L 50 20 Z" 
                                fill="white" 
                                opacity="0.9"
                                stroke="white" 
                                strokeWidth="3"
                              />
                              {/* Waistband */}
                              <ellipse cx="50" cy="30" rx="20" ry="5" fill="white" opacity="0.95"/>
                              {/* Leg openings */}
                              <ellipse cx="35" cy="50" rx="8" ry="12" fill="white" opacity="0.85"/>
                              <ellipse cx="65" cy="50" rx="8" ry="12" fill="white" opacity="0.85"/>
                              {/* Center absorption area */}
                              <ellipse cx="50" cy="55" rx="15" ry="20" fill="white" opacity="0.7"/>
                            </svg>
                          </motion.div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col flex-grow">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-xl font-heading font-bold text-gray-900 mb-1">
                            NoliQS {product.diaperType === 'pant' ? 'Pant' : 'Diaper'}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-soft-blue-600">{product.size}</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-700">{sizeLabels[product.size] || product.size}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-semibold">{product.pcs} Pcs</span>
                        </div>

                        {/* Features */}
                        <div className="space-y-2 pb-4">
                          <div className="flex flex-wrap gap-2">
                            {(isExpanded ? product.features : product.features.slice(0, 2)).map((feature: string, i: number) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="text-xs px-2 py-1 rounded-full bg-baby-blue-100 text-soft-blue-700 font-medium"
                              >
                                {feature}
                              </motion.span>
                            ))}
                            {product.features.length > 2 && !isExpanded && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setExpandedProducts(prev => new Set(prev).add(idx))
                                }}
                                className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium hover:bg-soft-blue-100 hover:text-soft-blue-600 transition-colors cursor-pointer"
                              >
                                +{product.features.length - 2} more
                              </motion.button>
                            )}
                            {product.features.length > 2 && isExpanded && (
                              <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setExpandedProducts(prev => {
                                    const newSet = new Set(prev)
                                    newSet.delete(idx)
                                    return newSet
                                  })
                                }}
                                className="text-xs px-2 py-1 rounded-full bg-soft-blue-100 text-soft-blue-600 font-medium hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
                              >
                                Show less
                              </motion.button>
                            )}
                            {product.features.length === 0 && (
                              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                                Premium Quality
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Buy Now Button - Always at bottom */}
                      <motion.a
                        href={product.typeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="block w-full pill-button bg-coral-500 text-white text-center hover:bg-coral-600 mt-6"
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        style={{ marginTop: 'auto' }}
                      >
                        Buy Now on Meesho
                      </motion.a>
                    </div>
                  </motion.div>
                )
              })}
          </div>

          {/* Load More Button */}
          {productsData.filter((product: any) => {
            if (selectedSize && product.size !== selectedSize) return false
            if (selectedType && product.diaperType !== selectedType) return false
            return true
          }).length > displayCount && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <motion.button
                onClick={handleLoadMore}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pill-button bg-soft-blue-600 text-white text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {isLoading ? (
                  <span className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Loading...
                  </span>
                ) : (
                  'Load More Products'
                )}
              </motion.button>
            </motion.div>
          )}

          {/* No Results Message */}
          {productsData.filter((product: any) => {
            if (selectedSize && product.size !== selectedSize) return false
            if (selectedType && product.diaperType !== selectedType) return false
            return true
          }).length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 text-lg">No products found with selected filters.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedSize(null)
                  setSelectedType(null)
                }}
                className="mt-4 px-6 py-2 rounded-full bg-soft-blue-600 text-white"
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-32 px-4 sm:px-6 lg:px-8 bg-white/30 laser-container">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
              NoliQS vs. Regular Diapers
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              See why thousands of parents make the switch
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glassmorphism rounded-3xl p-8 overflow-x-auto"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-heading text-lg">Feature</th>
                  <th className="text-center py-4 px-4 font-heading text-lg text-soft-blue-600">NoliQS</th>
                  <th className="text-center py-4 px-4 font-heading text-lg text-gray-500">Regular Diapers</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['10-Hour All-Night Protection', true, false],
                  ['Bubble Technology', true, false],
                  ['3-Layer Leakage Protection', true, false],
                  ['360° Soft Fit Waistband', true, false],
                  ['Wetness Indicator', true, false],
                  ['Anti-Rash Protection', true, false],
                  ['Non-Woven Breathable Material', true, 'partial'],
                ].map(([feature, noliqs, regular], idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">{feature}</td>
                    <td className="py-4 px-4 text-center">
                      {noliqs ? (
                        <Check className="w-6 h-6 text-soft-blue-600 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {regular === true ? (
                        <Check className="w-6 h-6 text-gray-500 mx-auto" />
                      ) : regular === 'partial' ? (
                        <span className="text-gray-500">~</span>
                      ) : (
                        <X className="w-6 h-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Science of Dryness Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 laser-container">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
              The Science of Dryness
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              How our 3-layer protection system with Bubble Technology keeps your baby dry
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                title: 'Non-Woven Soft & Breathable Top Layer',
                description: 'Gentle, breathable material that wicks moisture away from baby\'s skin instantly. Cotton-soft layers for ultimate comfort.',
                color: 'bg-baby-blue',
                icon: '🌬️'
              },
              {
                title: 'Bubble Technology Absorption Core',
                description: 'Advanced bubble technology with +30% high absorbency. Can absorb up to 7 glasses (350ml) of liquid for superior protection.',
                color: 'bg-soft-blue',
                icon: '💧'
              },
              {
                title: '3-Layer Leakage Protection',
                description: 'Triple-layer design ensures maximum protection against leaks for up to 10 hours of all-night protection.',
                color: 'bg-coral-100',
                icon: '🛡️'
              },
              {
                title: 'Leg Cuffs & Leak-Proof Barrier',
                description: 'Advanced elastic leg cuffs prevent thigh leakage, ensuring zero leaks even during active play and all-day outings.',
                color: 'bg-baby-blue',
                icon: '✨'
              },
            ].map((layer, idx) => {
              const isOpen = activeTab === idx
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glassmorphism rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl transition-all group"
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Clickable Header */}
                  <div 
                    className="flex items-center justify-between p-6"
                    onClick={() => setActiveTab(isOpen ? -1 : idx)}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        animate={{ scale: isOpen ? 1.1 : 1 }}
                        transition={{ duration: 0.3 }}
                        className={`w-12 h-12 rounded-full ${layer.color} flex items-center justify-center text-2xl flex-shrink-0`}
                      >
                        {layer.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-heading font-semibold text-gray-900 group-hover:text-soft-blue-600 transition-colors">
                          {layer.title}
                        </h3>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-4"
                    >
                      <ChevronDown className="w-6 h-6 text-gray-500" />
                    </motion.div>
                  </div>
                  
                  {/* Expandable Description */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? 'auto' : 0,
                      opacity: isOpen ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pl-20">
                      <p className="text-gray-700 leading-relaxed">
                        {layer.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Absorbency Demo Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-coral-50 to-pink-50 relative overflow-hidden laser-container">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
              Superior Absorbency Technology
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              7 Glasses of Liquid, Where 1 Glass is Equal to 50 ML
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glassmorphism rounded-3xl p-8 text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  💧
                </motion.div>
                <div className="text-5xl font-bold text-soft-blue-600 mb-2">350ml</div>
                <div className="text-xl text-gray-700">Total Absorption Capacity</div>
                <div className="mt-6 text-3xl font-bold text-coral-600">
                  +30% HIGH ABSORBENCY
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((glass, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 glassmorphism rounded-2xl p-4"
                >
                  <div className="w-12 h-12 rounded-full bg-baby-blue flex items-center justify-center text-2xl">
                    🥛
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Glass {glass}</div>
                    <div className="text-sm text-gray-600">50ml capacity</div>
                  </div>
                  <Check className="w-6 h-6 text-soft-blue-600" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Marquee */}
      <section id="reviews" className="py-32 px-4 sm:px-6 lg:px-8 bg-white/30 overflow-hidden laser-container">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
              Loved by Parents Everywhere
            </h2>
          </motion.div>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {[
              { name: 'Sarah M.', text: 'My baby sleeps through the night now! Zero leaks, zero rashes. The 10-hour protection is amazing!', rating: 5 },
              { name: 'Michael T.', text: 'Best diapers we\'ve tried. The Bubble Technology really works - no leaks at all!', rating: 5 },
              { name: 'Emily R.', text: 'So soft and gentle. The non-woven material is perfect for my sensitive baby.', rating: 5 },
              { name: 'David L.', text: 'The 3-layer protection is incredible. Worth every penny!', rating: 5 },
              { name: 'Jessica K.', text: 'Love the wetness indicator and the 360° soft fit waistband. Perfect for active babies!', rating: 5 },
            ].map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring" }}
                whileHover={{ y: -10, scale: 1.05, rotate: 2 }}
                className="glassmorphism rounded-3xl p-6 min-w-[300px] flex-shrink-0 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + i * 0.05 }}
                    >
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-soft-blue-400 to-soft-blue-600 flex items-center justify-center text-white font-semibold"
                  >
                    {review.name[0]}
                  </motion.div>
                  <span className="font-medium">{review.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-baby-blue-50 to-off-white laser-container">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glassmorphism rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-gray-900 mb-6 text-center tracking-tight">
              Contact Us
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-10 text-center leading-relaxed">
              Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:border-transparent ${
                    contactForm.name.trim() === '' && contactForm.name !== '' 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-200 focus:ring-soft-blue-500'
                  }`}
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:border-transparent ${
                    contactForm.email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-200 focus:ring-soft-blue-500'
                  }`}
                  placeholder="john@example.com"
                />
                {contactForm.email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email) && (
                  <p className="text-xs text-red-500 mt-1">Please enter a valid email address</p>
                )}
              </div>

              {/* Phone - Optional */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                  Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-soft-blue-500 focus:border-transparent"
                  placeholder="+1 234 567 8900"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-800 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:border-transparent ${
                    contactForm.subject.trim() === '' && contactForm.subject !== '' 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-200 focus:ring-soft-blue-500'
                  }`}
                  placeholder="How can we help you?"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:border-transparent resize-none ${
                    contactForm.message.trim() === '' && contactForm.message !== '' 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-200 focus:ring-soft-blue-500'
                  }`}
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                whileHover={{ scale: (isSubmitting || !isFormValid) ? 1 : 1.02 }}
                whileTap={{ scale: (isSubmitting || !isFormValid) ? 1 : 0.98 }}
                className={`w-full pill-button text-white text-lg shadow-xl transition-all ${
                  isFormValid && !isSubmitting
                    ? 'bg-coral-500 hover:bg-coral-600 cursor-pointer'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-green-100 text-green-700 text-center"
                >
                  ✓ Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-red-100 text-red-700 text-center"
                >
                  ✗ Something went wrong. Please try again or contact us directly.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <Image
                src="/images/logo.jpg"
                alt="NoliQS Logo"
                width={120}
                height={40}
                className="h-10 w-auto object-contain mb-4"
              />
              <p className="text-gray-700 text-sm">
                Premium baby care products designed with love and science.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-800">Products</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <button 
                    onClick={() => handleFooterProductFilter('diaper')}
                    className="hover:text-soft-blue-600 transition-colors text-left"
                  >
                    Diapers
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleFooterProductFilter('pant')}
                    className="hover:text-soft-blue-600 transition-colors text-left"
                  >
                    Pants
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleFooterProductFilter('all')}
                    className="hover:text-soft-blue-600 transition-colors text-left"
                  >
                    Bundles
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-800">Company</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <button onClick={() => scrollToSection('science')} className="hover:text-soft-blue-600 transition-colors text-left">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('science')} className="hover:text-soft-blue-600 transition-colors text-left">
                    Our Science
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-soft-blue-600 transition-colors text-left">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-700">
            <p>&copy; 2024 NoliQS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

